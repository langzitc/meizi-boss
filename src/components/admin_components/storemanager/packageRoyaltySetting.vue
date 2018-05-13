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
        <Card>
            <div class="clearfix" v-if="store_id">
                <i-col :xs="12" style="line-height: 30px">套餐订购提成列表</i-col>
                <i-col :xs="12" class="text-right">
                    <Input icon="ios-search" @on-change="searchProductName" v-model="keywords" placeholder="输入关键字..." style="width: 200px"></Input>
                </i-col>
                <i-col :xs="24" style="margin-top: 20px">
                        <Table border ref="srsTable" @on-selection-change="selectTableChange" :data="data" :columns="columns" :loading="loading"></Table>         
                        <div style="margin-top: 15px">
                            <i-col :sm="12">
                                <Button size="small" @click="clearAll()" :disabled="!isPlsz">全部清空</Button>         
                                <PackageRoyaltySettingModal @on-change="getProductList" :ids="selectColumns" :store_id="parseInt(store_id)">
                                    <Button size="small" :disabled="!isPlsz">批量设置</Button>                                
                                </PackageRoyaltySettingModal>                     
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
  import PackageRoyaltySettingModal from './packageRoyaltySettingModal'
  import SelectStore from '../store_select'
  import Utils from "../../../model/Utils"
  import EmployeeProductCommissionItemGroupedService from "../../../model/Commission/EmployeeProductCommissionItemGroupedService";
  let _this;
  export default {
    name: 'PackageRoyaltySetting',
    data () {
      return {
          page: 1,
          page_size: 10,
          total_count: 0,
          keywords: '',
          timer:null,
          loading: true,
          selectColumns: [],
          $searchState: false,
          data: [],
          columns: [{
              type: 'selection',
              width: '60px'
          },{
              title: '编号',
              key: 'sku',
              sortable: true,
              sortType: 'asc'              
          },{
              title: '套餐名称',
              key: 'name'
          },{
              title: '套餐类型',
              render (h,p){
                  let d = p.row.selected_category_options;
                  let arr = [];
                  d.map(e=>{
                      arr.push(e.label);
                  })
                  return arr.join(',');
              }
          },{
              title: '套餐销售提成标准',
              align: 'left',
              width: '200px',
              render(h,p){
                  let commission = p.row.commission && p.row.commission[0] ? p.row.commission[0] : null;
                  if(commission){
                      let el = [];
                      commission.items.map(e=>{
                          let groupserviceItem = new EmployeeProductCommissionItemGroupedService();
                          groupserviceItem.parseJSONObject(e);

                          let str =   groupserviceItem.getSaleCommissionRateWithLabel();
                          el.push(h('p',str));
                      })
                      return h('div',{
                          style: {
                              marginTop: "10px"
                          }
                      },el);
                  }
                  return '-';
              }
          },{
              title: '操作',
              width: '200px',
              render(h,p){
                  return h('div',[
                      h(PackageRoyaltySettingModal,{
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
            this.dataInit();
        }
    },
    methods: {
        dataInit (v){
            this.getProductList();
        },
        pageChange (v) {
            this.page = v;
            this.getProductList();
        },
        searchProductName() {
            Utils.delay(()=>{
                this.getProductList();
            },800)
        },
        getProductList () {
            if(this.store_id&&(!this.$searchState)){
                this.$searchState = true;
                this.loading = true;
                let params = {
                    store_id: this.store_id,
                    page: this.page,
                    page_size: this.page_size,
                    type_code: 'grouped_service'
                };
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
        tabChange (name) {
           
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
        if(this.store_id){
            this.dataInit();
        }       
    },
    components: {
        PackageRoyaltySettingModal,
        SelectStore
    }
  }
</script>

<style scoped>
    .zdy-table td{
        text-align: center;
    }
</style>

