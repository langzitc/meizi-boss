<template>
    <div class="demo-tabs-style2" style="position:relative">
      <Card>
        <Tabs>
          <TabPane label="新用户促销管理">
              <i-col :sm="24" :md="16" :lg="12">
                <Form ref="xyhcxgl" :label-width="200">
                    <FormItem label="新用户优惠">
                            新用户折扣<Input type="text" v-model="formA.new_customer_discount_rate">
                                <span slot="append">折</span>
                            </Input>
                            优惠上限 <Input type="text" v-model="formA.new_customer_discount_max">
                                <span slot="append">元</span>
                            </Input>       
                    </FormItem>
                    <FormItem label="新用户注册">
                            注册送<Input type="text" v-model="formA.new_customer_bonus">
                                <span slot="append">元奖金券</span>
                            </Input>
                            奖金券有效期 <Input type="text" v-model="formA.new_customer_bonus_duration">
                                <span slot="append">天</span>
                            </Input>                                          
                    </FormItem>     
                    <FormItem>
                        <Button type="info" @click="save('xyhcxgl')">保存</Button>
                    </FormItem>             
                </Form>                  
              </i-col>
          </TabPane>
          <TabPane label="商城评价奖励">
              <i-col :sm="24" :md="16" :lg="12">
                <Form ref="scpjjl" :label-width="200">
                    <FormItem label="会员首次评价奖励">
                            首次评价送<Input type="text" v-model="formB.first_review_bonus">
                                <span slot="append">元奖金券</span>
                            </Input>
                            奖金券有效期 <Input type="text" v-model="formB.first_review_bonus_duration">
                                <span slot="append">天</span>
                            </Input>       
                    </FormItem>
                    <FormItem label="会员评价奖励">
                            评价送<Input type="text" v-model="formB.review_bonus">
                                <span slot="append">元奖金券</span>
                            </Input>
                            奖金券有效期 <Input type="text" v-model="formB.review_bonus_duration">
                                <span slot="append">天</span>
                            </Input>                                          
                    </FormItem>     
                    <FormItem>
                        <Button type="info" @click="save('scpjjl')">保存</Button>
                    </FormItem>             
                </Form>                  
              </i-col>
          </TabPane>
        </Tabs>
      </Card>
    <div class="part-loading" v-show="loading">
        <Spin fix>
            <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
            <div>加载中</div>
        </Spin>			
    </div>         
    </div>
</template>

<script>
  import StoreSetting from "../../../model/StoreSetting"
  import Utils from "../../../model/Utils"
  export default {
    name: 'shop-promotion',
    data () {
      return {
        formA: Utils.clone(StoreSetting.formA),
        formB: Utils.clone(StoreSetting.formB)
      }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        },
        loading () {
            return this.$store.state.user.request !== 0;
        }
    },
    watch: {
        store_id () {
            this.getData();
        }
    },
    methods: {
        save (name) {
            let params = {
                store_id: this.store_id
            };
            params.store_id = 0; //目前只配置品牌店
            if(name === 'scpjjl'){
                Object.assign(params,this.formB);
            }else{
                Object.assign(params,this.formA);
            }
            this.$Spin.show();
            this.$http.post("/boss/store/setting",params).then(res=>{
                this.$Spin.hide();
                this.$Message.success(res.message);
                this.getData();
            });
        },
        getData () {
            this.$http.get("/boss/store/setting",{
                params: {
                    //store_id: this.store_id
                    store_id: 0 //目前只配置品牌店
                }
            }).then(res=>{
                let d = res.data;
                this.formA = Utils.clone(StoreSetting.formA)
                this.formB = Utils.clone(StoreSetting.formB)
                d.forEach(e=>{
                    switch(e.path){
                        case "new_customer_discount_rate":
                        case "new_customer_discount_max":
                        case "new_customer_bonus":
                        case "new_customer_bonus_duration":
                            this.formA[e.path] = Utils.parse(e.value,"parseFloat");
                            break;
                        case "first_review_bonus":
                        case "first_review_bonus_duration":
                        case "review_bonus":
                        case "review_bonus_duration":
                            this.formB[e.path] = Utils.parse(e.value,"parseFloat");
                            break;
                    }
                })
            })
        }
    },
    mounted () {
        if(this.store_id){
            this.getData();
        }
    }
  }
</script>

<style scoped>

</style>
