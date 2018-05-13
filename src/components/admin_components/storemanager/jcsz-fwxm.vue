<template>
  <div>
    <Card>
      <div slot="title" class="text-left">
        <add-fwxm-modal title="新增服务项目" @on-change="getServiceList">
            <Button type="info">新增服务项目</Button>          
        </add-fwxm-modal> 
        <set-fwxm-store :rows="selectRows" @on-change="getServiceList" @select-change="checkChange">
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
import AddFwxmModal from './jcsz/addFwxmModal'
import SetFwxmStore from './jcsz/setFwxmStore'
import SetFwxmPrice from './jcsz/setFwxmPrice'
import TableTag from '../TableTag'
let _this;
export default {
    name: 'jcsz-fwxm',
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
                width: 100
            },{
                title: '服务项目名称',
                ellipsis: true,
                key: 'name',
                width: 150
            },{
                title: '项目类型',
                width: 100,
                render: (h,p)=>{
                    return p.row.categories.map(e=>{
                        return e.name
                    }).join(',')
                }
            },{
                title: '规格',
                width:80,
                render: (h,p)=>{
                    return p.row.price_attributes_detail.map(e=>{
                        return e.label;
                    }).join(',')
                }
            },{
                title: '适用门店',
                width: 250,
                ellipsis: true,
                render: (h,p)=>{
                    let arr =  p.row.stores.map(e=>{
                        return e.name;
                    });
                    return h(TableTag,{
                        props: {
                            data: arr
                        }
                    })
                }
            },{
                title: '定价',
                ellipsis: true,
                align: 'center',
                render: (h,p)=>{
                    if(!p.row.price_attributes){
                        return '未定价';
                    }else{
                        if(p.row.price_attributes[0] == 0){
                            return p.row.price+"元";
                        }else{
                            let arr = [];
                            p.row.advanced_prices.forEach(e=>{
                                let code;
                                for(let key in e.attributes){
                                    code = key;
                                }
                                arr.push(h('p',`${e.attributes[code].label}:${parseFloat(e.price).toFixed(2)}元`));
                            })
                            return h('div',{
                                style: {
                                    margin: '15px 0'
                                }
                            },arr);
                        }
                    }
                    return p.row.price;
                }
            },{
                title: '操作',
                width: 200,
                align: 'right',
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
                        h(AddFwxmModal,{
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
                        xjBtn,
                        h(SetFwxmPrice,{
                            props: {
                                data: p.row
                            },
                            on: {
                                'on-change' () {
                                    _this.getServiceList();
                                }
                            },                            
                            style: {
                                marginLeft: '5px'
                            }                                                      
                        })                                                
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
                type_code: 'service'
            };
            this.$http.get("/boss/product/list",{params}).then((res)=>{
                this.data = res.data.items;
                this.total_count = parseInt(res.data.total_count);  
            })
        },
        checkChange (arr) {
            let d = JSON.parse(JSON.stringify(this.data));
            d.forEach(e=>{
                if(arr.includes(e.id)){
                    e._checked = true;
                }else{
                    e._checked = false;
                }
            })
            this.data = d;
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
        AddFwxmModal,
        SetFwxmStore,
        SetFwxmPrice,
        TableTag
    }
}
</script>

<style lang="less">
    .ivu-table-cell {
        padding: 6px;
    }
</style>
