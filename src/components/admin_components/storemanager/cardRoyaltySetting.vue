<template>
     <div class="demo-tabs-style2">
      <Card>
        <div slot="title" style="display: none;">
            <Row>
                <i-col :sm="12" class="text-left">
                    <select-store style="width: 200px"></select-store>                   
                </i-col>                  
            </Row>            
        </div>         
        <Card>
            <div class="clearfix" v-if="store_id">
                <i-col :xs="12" style="line-height: 30px">会员卡提成列表</i-col>
                <i-col :xs="12" class="text-right">
                    <Input icon="ios-search" @on-change="searchProductName" v-model="keywords" placeholder="输入关键字..." style="width: 200px"></Input>
                </i-col>
                <i-col :xs="24" style="margin-top: 20px">
                        <Table border ref="srsTable" @on-selection-change="selectTableChange" :data="data" :columns="columns" :loading="loading"></Table>         
                        <div style="margin-top: 15px">
                            <i-col :sm="12">
                                <Button size="small" @click="clearAll()" :disabled="!isPlsz">全部清空</Button>         
                                <CardRoyaltySettingModal @on-change="getProductList" :ids="selectColumns" :store_id="parseInt(store_id)">
                                    <Button size="small" :disabled="!isPlsz">批量设置</Button>                                
                                </CardRoyaltySettingModal>                     
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
  import CardRoyaltySettingModal from './cardRoyaltySettingModal'
  import SelectStore from '../store_select'
  import Utils from "../../../model/Utils"
  import EmployeeProductCommissionItemMemberCard from "../../../model/Commission/EmployeeProductCommissionItemMemberCard";
  let _this;
  export default {
    name: 'CardRoyaltySetting',
    data () {
      return {
          page: 1,
          page_size: 10,
          total_count: 0,
          keywords: '',
          loading: true,
          selectColumns: [],
          $searchState: false,
          data: [],
          columns: [{
              type: 'selection',
              width: '60px'
          },{
              title: '编号',
              sortable: true,
              sortType: 'asc',              
              key: 'sku'
          },{
              title: '会员卡名称',
              key: 'name'
          },{
              title: '会员卡提成标准',
              align: 'left',
              width: '200px',
              render(h,p){
                  if(p.row.commission&&p.row.commission.items.length){
                      let el = [];
                      p.row.commission.items.map(e=>{
                          let str1 = "";
                          let str2 = "";
                          let commissionItem = new EmployeeProductCommissionItemMemberCard();
                          commissionItem.parseJSONObject(e);
                          let label = commissionItem.getCommissionRateWithLabel();

                          el.push(h('p',label));
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
                      h(CardRoyaltySettingModal,{
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
        searchProductName() {
            Utils.delay(()=>{
                this.getProductList();
            },800)
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
                    page: this.page,
                    page_size: this.page_size,
                    store_id: this.store_id
                };
                if(this.keywords){
                    params.name = this.keywords;
                }
                params["response_data_model"] = "COMMISSION_SETTING_LIST";
                this.$http.get("/boss/memberCard/list",{params}).then((res)=>{
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
        CardRoyaltySettingModal,
        SelectStore
    }
  }
</script>

<style scoped>
    .zdy-table td{
        text-align: center;
    }
</style>
