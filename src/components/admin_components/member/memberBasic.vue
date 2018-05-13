<!-- 会员基本信息 -->
<template>
  <Row :gutter="10" class="hyjbxx">
    <i-col :xs="8">
      <Card>
        <div slot="title">
          <Row>
            <i-col :xs="12"><span class="text-sltitle text-warning">基本信息</span></i-col>
            <i-col :xs="12" class="text-right">
              <Button type="primary" size="small" @click="save1">保存</Button>
            </i-col>
          </Row>
        </div>
        <Form :label-width="80" label-position="left" style="height:242px">
          <FormItem label="会员姓名">
            <Input type="text" v-model="memberInfo.name" size="small"></Input>
          </FormItem>
          <FormItem label="手机号码">
            <Input type="text" v-model="memberInfo.mobile" size="small"></Input>
          </FormItem>
          <FormItem label="生日">
            <DatePicker type="date" :value="memberInfo.birthday" @on-change="birthdayChange" transfer placement="top" size="small"></DatePicker>
          </FormItem>   
          <FormItem label="性别">
              <RadioGroup v-model="memberInfo.gender">
                  <Radio :label="el.value" :key="el.value" v-for="el in genderList">
                      {{el.label}}
                  </Radio>
              </RadioGroup>
          </FormItem> 
          <FormItem label="备注">
            <Input type="textarea" v-model="memberInfo.comment" size="small"></Input>
          </FormItem>                                     
        </Form>
      </Card>
    </i-col>
    <i-col :xs="8" v-if="member.card&&member.card.id">
      <Card>
        <div slot="title">
          <Row>
            <i-col :xs="12"><span class="text-sltitle text-warning">会员卡信息</span></i-col>
            <i-col :xs="12" class="text-right">
              <Button type="primary" size="small" @click="save2">保存</Button>
            </i-col>
          </Row>
        </div>
        <Form :label-width="80" label-position="left" style="height:242px">
          <FormItem label="会员卡号">
            <Input type="text" v-model="memberCard.number" size="small"></Input>
          </FormItem>
          <FormItem label="卡类型">
            <Select placeholder="选择会员卡类型" v-model="memberCard.product_id" size="small">
                <Option :value="el.id" v-for="el in cardList" :key="el.id">{{el.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="折扣">
            <span>套餐:{{memberCard.discount_amount_for_service_group | percent}}</span>
            <span>消费项目:{{memberCard.discount_amount_for_service_item | percent}}</span>
          </FormItem>   
          <FormItem label="开卡时间">
            <DatePicker type="date" :value="memberCard.created_at" readonly transfer placement="top" size="small"></DatePicker>
          </FormItem> 
          <FormItem label="过期时间">
            <DatePicker type="date" v-show="!isExpired"  v-model="memberCard.expired_at" style="width:100px" transfer placement="top" size="small"></DatePicker>
            <Checkbox size="small" v-model="isExpired">无限期</Checkbox>
          </FormItem>           
          <FormItem label="消费密码">
            <Input type="password" v-model="memberCard.password" size="small"></Input>
          </FormItem>   
          <FormItem label="开卡门店">
            {{store_name}}
          </FormItem>                                            
        </Form>        
      </Card>    
    </i-col>
    <i-col :xs="8" v-if="member.card&&member.card.id">
      <Card>
        <div slot="title">
          <Row>
            <i-col :xs="12"><span class="text-sltitle text-warning">账户数据</span></i-col>
          </Row>
        </div>
        <Form :label-width="80" label-position="left" v-if="member.id&&member.card.id" style="height:242px">
          <FormItem label="卡金余额">
            <span class="text-amount">{{member.card.amount}}</span>元
          </FormItem>
          <FormItem label="赠送金">
            <span class="text-amount">{{member.card.given_amount}}</span>元
          </FormItem>
          <FormItem label="奖金券">
            <span class="text-amount">{{member.cash_coupons_total_amount}}</span>元(<span class="text-amount">{{member.cash_coupons_number}}</span>张)
          </FormItem>   
          <FormItem label="消费总额">
            <span class="text-amount">{{member.total_spent_amount}}</span>元&nbsp;&nbsp;次数:<span class="text-amount">{{member.total_consume_number}}</span>
          </FormItem> 
          <FormItem label="充值总额">
            <span class="text-amount">{{member.total_recharge_amount}}</span>元&nbsp;&nbsp;次数:<span class="text-amount">{{member.total_recharge_number}}</span>
          </FormItem>                                                     
        </Form>         
      </Card>    
    </i-col>
    <i-col :xs="16" v-if="member.card&&!member.card.id">
      <Card>
          <Alert type="warning" class="text-center" style="height:272px;line-height: 272px;font-size: 16px;">无会员卡</Alert>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import util from '../../../util'
  let _this;
  export default {
    name: 'MemberBasic',
    data () {
      return {
        memberInfo: {
          name: '',
          id: '',
          gender: '',
          mobile: '',
          birthday: '',
          comment: '',
          member_id: '',
          number: ''
        },
        isExpired: true,
        memberCard: {
          id: '',
          store_member_id : '',
          number : '',
          product_id : '',
          expired_at: '',
          password: '',
          store_id: '',
          created_at: '',
          discount_amount_for_service_group: '',
          discount_amount_for_service_item: ''
        }
      }
    },
    props: {
        member: {
            type: Object,
            required: true
        },
        isActivated: {
            type: Boolean,
            required: true
        }
    },
    watch: {
      isActivated (n,o) {
        if(n){
          this.init();
        }
      },
      member: {
        deep: true,
        handler: (n,o)=>{
          _this.init();
        }
      },
      isExpired (n,o) {
        if(n){
          this.memberCard.expired_at = "";
        }
      }
    },
    methods: {
      birthdayChange (v) {
        this.memberInfo.birthday = v;
      },
      init () {
          util.clone(this.memberInfo,this.member);
          if(this.member.detail){
            this.memberInfo.comment = this.member.detail.comment;
          }
          if(this.member.card&&this.member.card.id){
            util.clone(this.memberCard,this.member.card);
          }
          if(this.memberCard.expired_at){
            this.isExpired = false;
          }else{
            this.isExpired = true;
          }       
      },
      save1 () {
          this.$emit('open-loading');
          this.$http.post('/boss/storeMember/update',this.memberInfo).then(res=>{
                if(res) {
                    this.$Message.success(res.message);
                    this.$emit("on-change");                   
                }
                this.$emit('close-loading'); 
          });
      },
      save2 () {
          this.$emit('open-loading');
          if(this.memberCard.expired_at&&this.memberCard.expired_at.getTime){
            this.memberCard.expired_at = this.memberCard.expired_at.Format('yyyy-MM-dd');            
          }
          this.$http.post('/boss/storeMember/addAndReplaceCard',this.memberCard).then(res=>{
              if(res) {
                  this.memberCard.discount_amount_for_service_group = res.data.discount_amount_for_service_group;
                  this.memberCard.discount_amount_for_service_item = res.data.discount_amount_for_service_item;
                  this.$Message.success(res.message);
                  this.$emit("on-change");
              }
              this.$emit('close-loading');  
          });
      }
    },
    mounted () {
      _this = this;
    },
    computed: {
      genderList () {
        return this.$store.state.user.genderList;
      },
      cardList () {
          return this.$store.state.story.cardList;
      },
      store_name () {
        let list = this.$store.state.story.storeList;
        let id = this.memberCard.store_id;
        let str = '';
        list.forEach(e=>{
          if(e.id === id){
            str = e.name;
          }
        })
        return str;
      }      
    }
  }
</script>

<style lang="less">
</style>