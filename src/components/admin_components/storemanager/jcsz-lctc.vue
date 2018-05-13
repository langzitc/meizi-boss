<template>
  <div>
    <Card>
      <div slot="title" class="text-left">
        <add-lctc-modal title="新增疗程套餐" @on-change="getServiceList">
            <Button type="info">新增疗程套餐</Button>          
        </add-lctc-modal> 
        <set-fwxm-store :rows="selectRows" @on-change="getServiceList">
            <Button type="info" :disabled="selectRows.length === 0">批量设置项目适用门店</Button> 
        </set-fwxm-store> 
        <Button type="primary" @click="delAll" :disabled="selectRows.length === 0">删除</Button>    
      </div>
      <div>
        <Table ref="fwxmTable" border :columns="columns" :loading="loading" :data="data" @on-selection-change="selectChange"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
        </div>
      </div>
    </Card>
  </div>    
</template>

<script>
import AddLctcModal from './jcsz/addLctcModal'
import SetFwxmStore from './jcsz/setFwxmStore'
let _this;
export default {
    name: 'jcsz-lctc',
    data (){
        return {
            total_count: 0,
            params: {
                page: 1,
                page_size: 10
            },
            data: [],
            selectRows: [],
            columns: [{
                type: 'selection',
                width: 80,
                align: 'center'
            },{
                title: '编号',
                key: 'sku',
                width: 150
            },{
                title: '套餐名称',
                key: 'name',
                width: 120
            },{
                title: '开始时间',
                width: 150,
                render: (h,p)=>{
                    return (new Date(p.row.start_at)).Format('yyyy-MM-dd');
                }
            },{
                title: '结束时间',
                width:150,
                render: (h,p)=>{
                    return (new Date(p.row.expired_at)).Format('yyyy-MM-dd');
                }                
            },{
                title: '有效期(月)',
                key: 'term_of_validity',
                width: 100
            },{
                title: '项目明细',
                width: 200,
                render: (h,p)=>{
                    let d = p.row.grouped_service_items;
                    console.log(p);
                    if(Array.isArray(d)){
                         let arr = [];
                         d.forEach(e=>{
                            arr.push(h('Tag',{
                                props: {
                                    color: 'green'
                                }
                            },e.name));
                        });
                        return h('div',arr);
                    }else{
                        return '无';
                    }
                }
            },{
                title: '价格(元)',
                key: 'price',
                width: 100
            },{
                title: '适用门店',
                width: 200,
                render: (h,p)=>{
                    let arr = [];
                    p.row.stores.forEach(e=>{
                        arr.push(h('Tag',{
                            props: {
                                color: 'blue'
                            }
                        },e.name))
                    })
                    return h('p',arr);
                }                
            },{
                title: '状态',
                key: 'status_label'
            },{
                title: '操作',
                width: 150,
                align: 'right',
                fixed: 'right',
                render: (h,p)=>{
                    let xjBtn = p.row.status == 1 ? h('Button',{
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        on: {
                            click: ()=>{
                                _this.setStatus(p.row.id,0);
                            }
                        }
                    },'下架') :
                    h('Button',{
                        props: {
                            type: 'success',
                            size: 'small'
                        },
                        on: {
                            click: ()=>{
                                _this.setStatus(p.row.id,1);
                            }
                        }                        
                    },'上架');                  
                    return h('span',[
                        h(AddLctcModal,{
                            props: {
                                id: parseInt(p.row.id),
                                data: p.row
                            },
                            on: {
                                'on-change' () {
                                    _this.getServiceList();
                                }
                            }
                        }),
                        xjBtn                                               
                    ])
                }
            }]
        }
    },
    computed: {
        loading () {
            return this.$store.state.user.request !== 0;
        }        
    },
    methods: {
        getServiceList (){
            this.selectChange([]);
            let params = {
                page: this.page,
                page_size: this.page_size,
                type_code: 'grouped_service'
            };
            this.$http.get("/boss/product/list",{params}).then((res)=>{
                this.data = res.data.items;
                this.total_count = parseInt(res.data.total_count);  
            })
        },
        pageChange (p){
            this.params.page = p;
            this.getServiceList();
        },
        selectChange (selection) {
            this.selectRows = selection;
        },
        del (id){
            this.$Modal.confirm({
                title: '系统提示',
                content: '确认删除所选服务项目？',
                onOk: () => {
                    this.btnLoading = true;
                    this.$http.post('/boss/product/delete',{
                        id
                    }).then(res=>{
                        this.$Message.success(res.message);
                        this.getServiceList();
                    })
                }
            });
        },
        delAll () {
            this.del(this.selectRows.map(e=>{return e.id}).join(','));
        },
        setStatus (id,status) {
            this.$Modal.confirm({
                title: '系统提示',
                content: status == 1 ? '确认上架 ?' : '确认下架 ？',
                onOk: () => {
                    this.btnLoading = true;
                    this.$http.post('/boss/product/update',{
                        id,
                        status
                    }).then(res=>{
                        this.$Message.success(res.message);
                        this.getServiceList();
                    })
                }
            });            
        }            

    },
    mounted () {
        _this = this;
        this.$store.dispatch('GET_SERVICE_TYPE');
        this.$store.dispatch('GET_STORE_BY_GROUP');
        this.getServiceList();
    },
    components: {
        AddLctcModal,
        SetFwxmStore
    }
}
</script>

<style>
</style>
