<template>
  <Card>
      <div slot="title">
          <Row :gutter="20">
              <i-col :sm="12">
                  <select-stafftype :id="group_id" style="width: 200px" @stafftype-change="stafftypeChange"></select-stafftype>
              </i-col>
              <i-col :sm="12" class="text-right">
                  <set-service :store_id="store_id" :items="selection" @on-change="getEmployeeList" @on-remove="remove">
                      <Button type="info">批量设置服务</Button>
                  </set-service>
              </i-col>           
          </Row>
      </div>
    <Row style="margin-bottom: 20px">
        <i-col :sm="12">预约员工列表</i-col>
        <i-col :sm="6" :offset="6" class="text-right">
            <Input type="text" v-model="keywords" @on-change="searchEmployee" placeholder="姓名|手机号|卡号" style="width: 200px" class="pull-right">
                <Button type="primary" slot="append" @click="getEmployeeList">搜索</Button>
            </Input>  
        </i-col>
    </Row>
    <Table border ref="srsTable" :data="data" @on-selection-change="selectTableCol" :columns="columns" :loading="loading"></Table>         
    <div style="margin-top: 15px" class="text-right">
        <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page> 
    </div>        
  </Card>
</template>

<script>
import SelectStore from '../store_select'
import SelectStafftype from '../stafftype_select'
import SetService from './set-service'
import Utils from "../../../model/Utils"
import TableTag from '../TableTag'
let _this;
export default {
    name: 'StaffReservation',
    data () {
        return {
            group_id: '',
            keywords: '',
            selection: [],
            data: [],
            columns: [{
                type: 'selection',
                width: 70
            },{
                title: '编号',
                ellipsis: true,
                key: 'employee_number'
            },{
                title: '姓名',
                key: 'name',
                ellipsis: true
            },{
                title: '级别',
                key: 'job_title_name',
                ellipsis: true
            },{
                title: '联系方式',
                key: 'mobile',
                width: 120
            },{
                title: '服务项目',
                width: 220,
                render (h,p) {
                    if(p.row.service_items.length){
                        let arr = p.row.service_items.map(e=>{
                            return e.name;
                        });
                        return h(TableTag,{
                            props: {
                                data: arr
                            }
                        });
                    }else{
                        return '-';
                    }
                }
            },{
                title: '状态',
                ellipsis: true,
                render (h,p) {
                    if(p.row.allow_appointment == 1){
                        return '可预约';
                    }else{
                        return '不可预约';
                    }
                }
            },{
                title: '操作',
                width: 220,
                render (h,p) {
                    let arr = [
                        h(SetService,{
                            props: {
                                store_id: _this.store_id,
                                items: [p.row]
                            },
                            style: {
                                marginRight: '15px'
                            },
                            on: {
                                'on-change' (){
                                    _this.getEmployeeList();
                                }
                            }                                
                        })                        
                    ];
                    if(p.row.allow_appointment == 1){
                        arr.push(
                            h('Button',{
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click (){
                                        _this.setYuyue(p.row.id,0);
                                    }
                                }                                
                            },'取消预约')
                        );
                    }else{
                        arr.push(
                            h('Button',{
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click (){
                                        _this.setYuyue(p.row.id,1);
                                    }
                                }                                
                            },'提供预约')
                        );
                    }
                    return h('span',arr);
                }
            }],
            page: 1,
            page_size: 10,
            total_count: 0,
            loading: false
        }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        }
    },
    watch: {
        store_id () {
            this.dataInit();
        }
    },
    methods: {
        searchEmployee() {
            Utils.delay(()=>{
                this.getEmployeeList();
            },800);
        },
        dataInit (){
            this.getEmployeeList();
        },
        pageChange (v) {
            this.page = v;
        },
        stafftypeChange (v){
            this.group_id = v;
            this.getEmployeeList();
        },
        setYuyue (id,status) {
            let tips = "确认取消预约?";
            if(status == 1){
                tips = "确认提供预约?";
            }
            this.$Modal.confirm({
                title: '系统提示',
                content: tips,
                onOk: ()=>{
                    this.$http.post("/boss/employee/update",{id,allow_appointment: status}).then(res=>{
                        this.$Message.success(res.message);
                        this.getEmployeeList();
                    })
                }
            });
        },
        getEmployeeList () {
            let params = {
                store_id: this.store_id,
                page: this.page,
                page_size: this.page_size,
                with_service_items: 1
            };
            if(this.group_id){
                params.job_title_id = this.group_id;
            }
            if(this.keywords){
                params.keywords = this.keywords;
            }
            this.loading = true;
            this.$http.get("/boss/employee/list",{params}).then(res=>{
                this.data = res.data.items;
                this.total_count = res.total_count;
                this.loading = false;
            })

        },
        selectTableCol (selection) {
            this.selection = selection;
        },
        remove (id){
            this.data.forEach((e,i)=>{
                if(e.id === id){
                    this.$refs['srsTable'].toggleSelect(i);
                }
            })
        } 
    },
    mounted () {
        _this = this;
        if(this.store_id){
            this.dataInit();
        }
    },
    components: {
        SelectStore,
        SelectStafftype,
        SetService,
        TableTag
    }
}
</script>

<style>

</style>
