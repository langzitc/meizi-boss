<template>
  <div>
    <Card class="clearfix" style="padding-bottom: 20px">
      <i-col :sm="24" class="text-left">
        <select-store style="width:200px"></select-store>
        <Select v-model="category_ids"  @on-change="dataInit" style="width: 200px" placeholder="服务类型">
          <Option value="">全部服务类型</Option>
          <Option v-for="el in typeList" :value="el.id" :key="el.id">{{el.name}}</Option>
        </Select>
      </i-col>
    </Card>
    <Card v-if="store_id">
      <div slot="title" class="text-right">
        <Input icon="ios-search" v-model="keywords" placeholder="输入关键字..." style="width: 200px"></Input>
      </div>
      <div>
        <Table border :columns="columns" :data="data" :loading="loading"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>
        </div>        
      </div>
    </Card>
    <Card v-if="!store_id">
      <div class="text-center">
        <Alert type="warning">
          <h5>请选择门店</h5>
        </Alert>
      </div>
    </Card>
    <Modal
      title="设置会员价"
      v-model="modalState"
      :loading="modalState"
      ok-text="保存"
      class-name="modal-scroll"
      width="650"
      :mask-closable="false"      
    >
      <div slot="footer">
          <Button type="text" size="large" @click="handleCancel">取消</Button>
          <Button type="primary" size="large" @click="handleSave">保存</Button>
      </div> 
      <div>
        <Form :label-width="130">
            <FormItem label="已选项目">
                <Tag type="border" closable color="blue">{{formItem.name}}</Tag>
            </FormItem>  
            <FormItem label="会员卡设置">
                <RadioGroup v-model="formItem.is_global">
                  <Radio label="1">统一设置</Radio>
                  <Radio label="0">分开设置</Radio>
                </RadioGroup> 
            </FormItem>  
            <FormItem label="统一设置" v-if="formItem.is_global == 1" class="clearfix">
              <RadioGroup v-model="formItem.global_discount_type">
                <i-col :sm="11">
                  <Input type="text" v-model="formItem.global_discount_amount" :disabled="formItem.global_discount_type==1">
                    <span slot="prepend"><Radio label="0" style="top: 5px">金额</Radio></span>
                    <span slot="append"><Icon type="social-yen"></Icon></span>               
                  </Input>
                  <p class="text-warning">设置金额不能大于原价</p>                    
                </i-col>
                <i-col :sm="11" :offset="2">
                  <Input type="text" v-model="formItem.global_discount_amount" :disabled="formItem.global_discount_type==0">
                    <span slot="prepend"><Radio label="1" style="top: 5px">折扣</Radio></span>
                    <span slot="append">折</span>                  
                  </Input>
                  <p class="text-warning">1～10折</p>                    
                </i-col>    
              </RadioGroup>              
            </FormItem>  
            <FormItem :label="el.name" v-for="el in formItem.items" :key="el.member_card_id" v-if="formItem.is_global == 0">
              <RadioGroup v-model="el.discount_type">
              <i-col :sm="11"> 
                <Input type="text" v-model="el.amount" :disabled="el.discount_type==1">
                  <span slot="prepend"><Radio label="0" style="top: 5px">金额</Radio></span>
                  <span slot="append"><Icon type="social-yen"></Icon></span>                
                </Input>                   
              </i-col>
              <i-col :sm="11" :offset="2">
                <Input type="text" v-model="el.amount" :disabled="el.discount_type==0">
                  <span slot="prepend"><Radio label="1" style="top: 5px">折扣</Radio></span>
                  <span slot="append">折</span>                
                </Input>                   
              </i-col>  
              </RadioGroup>                                                    
            </FormItem>                                   
        </Form>
      </div>       
    </Modal>
  </div>   
</template>

<script>
import SelectStore from '../store_select'
let _this;
export default {
    name: 'ServiceItemsFwxmhyjsz',
    data (){
        return {
            modalState: false,
            loading: false,
            page: 1,
            page_size: 10,
            total_count: 0,
            keywords: '',
            category_ids: '',
            memberCardList: [],
            formItem: {
              name: '',
              product_id: '',
              is_global: 1,
              global_discount_type: 0,
              global_discount_amount: 0,
              items: []
            },
            data: [],
            columns: [{
              title: '编号',
              key: 'sku'
            },{
              title: '套餐名称',
              key: 'name'
            },{
              title: '类型',
              render(h,p){
                  let arr = [];
                  p.row.selected_category_options.map(e=>{
                      arr.push(e.label);
                  })
                  return arr.join(",");
              }
            },{
              title: '原价',
              key: 'price'
            },{
              title: '会员价',
              render(h,p){
                let d = p.row.discount_details.items;
                let el = [];
                if(Object.prototype.toString.apply(d) === '[object Array]'&&d.length){
                  d.map(e=>{
                    el.push(h("p",`${e.member_card_name}: ${e.amount} 元`));
                  })
                }else{
                  if(p.row.discount_details.global_discount_type==0){
                    el.push(h('p',`统一价： ${p.row.discount_details.global_discount_amount} 元`));
                  }else{
                    el.push(h('p','-'));
                  }
                }
                return h('div',el);
              }
            },{
              title: '操作',
              className: 'mzmy-table-oper',
              render(h,p){
                let el = [
                  h('a',{
                    on: {
                      click(e){
                        _this.modalState = true;
                        _this.$http.get("/boss/product/productDiscountInfo",{params:{
                          product_id: p.row.id
                        }}).then(res=>{
                          _this.formItem.product_id = res.data.product_id;
                          _this.formItem.name = res.data.product_name;
                          _this.formItem.global_discount_amount = res.data.global_discount_amount||0;
                          _this.formItem.global_discount_type = res.data.global_discount_type||0;
                          _this.formItem.is_global = res.data.is_global;
                          let arr = res.data.items;
                          let arr2 = _this.memberCardList;
                          let arr3 = [];
                          arr2.map(e=>{
                            let member_card_id = e.id;
                            let discount_type = 0;
                            let amount = 0;
                            let id = null;
                            arr.map(e2=>{
                              if(e2.member_card_id == e.id){
                                discount_type = e2.discount_type;
                                amount = e2.amount;
                                id = e2.id||null;
                              }
                            })
                            arr3.push({
                              member_card_id,
                              discount_type,
                              amount,
                              name: e.name
                            })
                          })
                          _this.formItem.items = arr3;
                        })
                      }
                    }
                  },"修改")                
                ];
                if(p.row.discount_details.is_global){
                  el.push(
                    h('a',{
                      on: {
                        click(e){
                          _this.$Modal.confirm({
                              title: '系统提示',
                              content: '<h4 class="text-warning text-center">确认清空？</h4>',
                              onOk: ()=>{
                                  _this.$http.post("/boss/product/clearProductDiscount",{product_id: p.row.id}).then(res=>{
                                      _this.$Message.success(res.message);
                                      _this.getTcList();
                                  })
                              }
                          });                           
                        }
                      }
                    },'清空')                      
                  );
                }
                return h('div',el)
              }
            }],  
            typeList: []          
        }
    },
    computed: {
        store_id (){
            return this.$store.state.story.store_id;
        }  
    },
    watch: {
      store_id () {
        this.dataInit();
      }
    },
    methods: {
        getTypeList(){
            let params = {
                store_id: this.$store.store_id,
                type_code: 'grouped_service'
            };
            this.$http.get("/boss/category/list",{params}).then(res=>{
                this.typeList = res.data;
            });
        },
        dataInit (){
            this.getTypeList();
            this.getTcList();
        },
        pageChange (v){
          this.page = v;
          this.getTcList();
        },
        getTcList (){
            if(this.store_id){
                let params = {
                    store_id: this.store_id,
                    page: this.page,
                    page_size: this.page_size,
                    type_code: "grouped_service"
                };
                if(this.category_ids){
                  params.category_ids = this.category_ids;
                }
                if(this.keywords){
                    params.keywords = this.keywords;
                }
                this.loading = true;
                this.$http.get("/boss/product/list",{params}).then((res)=>{
                    this.data = res.data.items;
                    this.total_count = parseInt(res.data.total_count);  
                    this.loading = false;
                });
            }          
        },
        getMemberShipList (){
          this.$http.get("/boss/memberCard/list").then(res=>{
            this.memberCardList = res.data.items;
          })
        },
        handleSave (){
          let params = JSON.parse(JSON.stringify(this.formItem));
          if(this.formItem.is_global == 1){
            params.items = [];
          }else{
            params.global_discount_type = null;
            params.global_discount_amount = null;
          }
          this.$http.post("/boss/product/updateProductDiscount",params).then(res=>{
            this.$Message.success(res.message);
            this.getTcList();
          })
        },
        handleCancel (){
          this.modalState = false;
        }        
    },
    components: {
        SelectStore
    },      
    mounted (){
      _this = this;
      this.getMemberShipList();
      if(this.store_id){
        this.dataInit();
      }
    }    
}
</script>

<style>

</style>

