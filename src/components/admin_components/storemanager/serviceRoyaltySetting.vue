<template>
     <div class="demo-tabs-style2">
      <Card>
        <div slot="title" style="display: none">
            <Row>
                <i-col :sm="12" class="text-left">
                    <select-store style="width: 200px"></select-store>
                </i-col>
            </Row>
        </div>
        <Row style="margin-bottom:20px">
            <i-col :sm="12" class="text-left"> 
                <Select v-model="category_id"  @on-change="typeChange" style="width: 200px" placeholder="服务项目类型">
                    <Option-group v-if="serviceTypeList.length>0"  :label="el.name" v-for="el in serviceTypeList" :key="el.id">
                        <i-option v-if="el.children" :value="el2.id" v-for="el2 in el.children" :key="el2.id">{{ el2.name }}</i-option>
                    </Option-group>   
                </Select>                 
            </i-col>                  
        </Row>
        <Card>
            <div class="clearfix" v-if="store_id">
                <i-col :xs="12" style="line-height: 30px">服务项目提成列表</i-col>
                <i-col :xs="12" class="text-right">
                    <Input icon="ios-search" @on-change="searchProductName" v-model="keywords" placeholder="输入关键字..." style="width: 200px"></Input>
                </i-col>
                <i-col :xs="24" style="margin-top: 20px">
                        <Table border ref="srsTable" @on-selection-change="selectTableChange" :data="data" :columns="columns" :loading="loading"></Table>         
                        <div style="margin-top: 15px">
                            <i-col :sm="12">
                                <Button size="small" @click="clearAll()" :disabled="!isPlsz">全部清空</Button>         
                                <ServiceRoyaltySettingModal @on-change="getProductList" :ids="selectColumns" :store_id="parseInt(store_id)">
                                    <Button size="small" :disabled="!isPlsz">批量设置</Button>                                
                                </ServiceRoyaltySettingModal>                     
                            </i-col>
                            <i-col class="text-right" :sm="12">
                                <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>                            
                            </i-col>
                        </div>                             
                </i-col>
            </div>
            <div class="text-center" v-if="!store_id">
                <Alert type="warning">
                <h5>请选择门店</h5>
                </Alert>
            </div>          
        </Card>                    
      </Card>  
    </div> 
</template>

<script>
  import ServiceRoyaltySettingModal from './serviceRoyaltySettingModal'
  import SelectStore from '../store_select'
  import Utils from "../../../model/Utils"
  let _this;
  export default {
    name: 'ServiceRoyaltySetting',
    data () {
      return {
          category_id: '',
          page: 1,
          page_size: 10,
          total_count: 0,
          keywords: '',
          loading: true,
          serviceTypeList: [],
          selectColumns: [],
          $searchState: false,
          data: [],
          columns: [{
              type: 'selection',
              width: '60px',
              align: 'center'
          },{
              title: '编号',
              key: 'sku',
              sortable: true,
              sortType: 'asc',
              align: 'center'
          },{
              title: '服务项目名称',
              key: 'name',
              align: 'center'
          },{
              title: '项目类型',
              align: 'center',
              render(h,p){
                let arr = [];
                p.row.selected_category_options.map(e=>{
                    arr.push(e.label);
                })
                return arr.join(",");
              }              
          },{
              title: '服务项目提成标准',
              align: 'center',
              className:"view-commission-detail",
              width: '200px',
              render(h,p){
                    let v = [] ;
                  p.row.commission.map((commission)=>{
                      console.log(commission)
                      if(commission.items.length){
                          let iv = h('Button',{
                              props: {
                                  type: 'success',
                                  size: 'small'
                              },
                              on: {
                                  click (){
                                      _this.showCommission(commission);
                                  }
                              }
                          },'查看'+commission.root_job_title_name+' 提成详情');
                          v.push(iv);
                      }else{
                          v.push( '未设置');
                      }
                  });
                  return v;
              }
          },{
              title: '操作',
              width: '200px',
              align: 'center',
              render(h,p){
                  return h('div',[
                      h(ServiceRoyaltySettingModal,{
                          props: {
                             ids: [p.row],
                             store_id: parseInt(_this.store_id)
                          },
                          on: {
                              'on-change': _this.getProductList
                          }
                      }),
                      h('Button',{
                          props: {
                              type: 'warning',
                              size: 'small'
                          },
                          style: {
                              marginLeft: '15px'
                          },
                          on: {
                              click(e){
                                  _this.clear(p.row.id);
                              }
                          }
                      },'清空')
                  ])
              }
          }]
      }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        },
        isPlsz () {
            return this.selectColumns.length>0;
        }
    },
    watch: {
        store_id () {
            this.getProductList();
        }
    },
    methods: {
        searchProductName() {
            Utils.delay(()=>{
                this.getProductList();
            },800)
        },
        showCommission (data) {
            this.$Modal.confirm({
                title: '提成详情',
                width: 700,
                render: (h)=>{
                    let el = [];
                    let d = data.items;
                    let f1 = (id)=>{
                        switch (parseInt(id)) {
                            case 1:
                                return '散客';
                                break;
                            case 2:
                                return '会员';
                            case 3: 
                                return '拓客奖励';
                                break;   
                            default:
                                return '统一设置';
                                break;
                        }
                    }
                    let f2 = (id)=>{
                        switch (parseInt(id)) {
                            case 1:
                                return '指定';
                                break;
                            case 2:
                                return '未指定';
                            case 3: 
                                return '内创';
                                break;   
                            default:
                                return '统一设置';
                                break; 
                        }                               
                    }
                    let f3 = (id)=>{
                        switch (parseInt(id)) {
                            case 0:
                                return '固定金额';
                                break;
                            case 1:
                                return '百分比'; 
                            default:
                                return '未知';
                                break; 
                        }                              
                    }
                    d.map(e=>{
                        el.push(h('tr',[
                            h('td',e.job_title),
                            h('td',f1(e.member_type)),
                            h('td',f2(e.assigned_type)),
                            h('td',f3(e.commission_type)),
                            h('td',e.commission_amount)                             
                        ]));
                    })
                    return h('div',{
                        attrs: {
                            class: 'confirm-scroll'
                        }
                    },[
                        h('table',{
                            attrs: {
                                class: 'table table-striped table-bordered'
                            },
                            style: {
                                width: '100%'
                            }
                        },[
                            h('thead',[
                                h('tr',[
                                    h('th','类型'),
                                    h('th','顾客类型'),
                                    h('th','服务方式'),
                                    h('th','提成类型'),
                                    h('th','金额／比例')
                                ]) 
                            ]),
                            h('tbody',el)
                        ])                        
                    ])
                }
            });
        },
        getServiceTypeList () {
            this.$http.get("/boss/category/list",{
                params: {
                    store_id: 0,
                    type_code: 'service'
                }
            }).then(res=>{
                this.serviceTypeList = res.data;
            });
        },
        pageChange (v) {
            this.page = v;
            this.getProductList();
        },
        getProductList () {
            if(this.store_id&&(!this.$searchState)){
                this.$searchState = true;
                this.loading = true;
                let params = {
                    store_id: this.store_id,
                    page: this.page,
                    page_size: this.page_size,
                    type_code: 'service'
                };
                if(this.category_id){
                    params.category_id = this.category_id;
                }
                if(this.keywords){
                    params.name = this.keywords;
                }
                params["response_data_model"] = "COMMISSION_SETTING_LIST";
                this.$http.get("/boss/product/list",{params}).then((res)=>{
                    this.data = res.data.items;
                    this.total_count = parseInt(res.data.total_count);  
                    this.loading = false;
                    this.$searchState = false;
                });
            }            
        },
        typeChange (v) {
            this.getProductList();
        },
        selectTableChange (v){
            this.selectColumns = v;
        },
        clear (id) {
            this.$Modal.confirm({
                title: '系统提示',
                content: '<h4 class="text-warning text-center">确认清空？</h4>',
                onOk: ()=>{
                    this.$http.post("/boss/employeeCommission/clearCommission",{store_id: this.store_id, product_id: id}).then(res=>{
                        this.$Message.success(res.message);
                        this.getProductList();
                    })  
                }
            });                        
        },
        clearAll () {
            let pids = [];
            this.selectColumns.map(e=>{
                pids.push(e.id);
            })
            this.clear(pids.join(','));
        }
    },
    mounted (){
        _this = this;
        this.getServiceTypeList();
        if(this.store_id){
            this.getProductList();
        }  
        this.$store.dispatch("GET_STAFF_TYPE_LIST",{
            store_id: 0
        })              
    },
    components: {
        ServiceRoyaltySettingModal,
        SelectStore
    }
  }
</script>

<style>
    .zdy-table td{
        text-align: center;
    }
    .confirm-scroll{
        max-height: 600px;
        overflow: auto;
    }
    .view-commission-detail button {
        margin:10px 0px;
    }
</style>
