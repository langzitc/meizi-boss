<!-- 会员项目消费记录 -->
<template>
  <div>
    <Alert type="warning">
      开卡充值总额：<span class="text-amount">{{total_amount}}</span>元
      
      <span v-for="(el,index) in payinfoList" :key="el.name">
        <span v-show="index === 0">(</span>
        {{el.name}}：<span class="text-amount">{{el.amount}}</span>元<span v-show="index<payinfoList.length-1">,</span>
        <span v-show="index === payinfoList.length-1">)</span>
      </span>
      
    </Alert>
    <Table border :data="data" :columns="columns" size="small" stripe></Table>
    <div class="text-right" style="margin-top: 15px">
        <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>
    </div>    
  </div>
</template>

<script>
  let _this;
  export default {
    name: 'MemberKkczjl',
    data () {
      return {
          total_count: 0,
          data: [],
          summary: [],
          page: 1,
          page_size: 6,
          columns: [{
            title: '单号',
            key: 'trans_number'
          },{
            title: '卡类型',
            render (h,p) {
              return p.row.items.map(e=>{
                return e.product_name;
              }).join(',');
            }
          },{
            title: '订单金额',
            key: 'grand_total'
          },{
            title: '操作时间',
            key: 'updated_at'
          },{
            title: '相关人员',
            render (h,p) {
              let set = new Set();
              p.row.items.forEach(e=>{
                e.employees.forEach(e2=>{
                    set.add(e2.employee_name);
                })
              })
              return Array.from(set).join(',');
            }
          }]        
      }
    },
    computed: {
        total_amount () {
          let n = 0;
          this.summary.forEach(e=>{
            n+=parseFloat(e.amount);
          })
          return n.toFixed(2);
        },
      payinfoList () {
        let arr = [];
        if(this.summary.length&&this.summary[0].methods){
          let obj = this.summary[0].methods;
          for(let k in obj){
            switch (k){
              case 'Check': 
                arr.push({
                  name: '现金',
                  amount: obj[k].amount
                });
              break;
              case 'MemberCardGivenAmount': 
                arr.push({
                  name: '赠送金',
                  amount: obj[k].amount
                });              
              break;
              case 'MemberCardAmount': 
                arr.push({
                  name: '会员卡',
                  amount: obj[k].amount
                });              
              break;
              case 'MemberPreOrdered': 
                arr.push({
                  name: '套餐卡',
                  amount: obj[k].amount
                });              
              break;
              case 'BonusCoupon': 
                arr.push({
                  name: '现金券',
                  amount: obj[k].amount
                });              
              break;
              case 'Alipay': 
                arr.push({
                  name: '支付宝',
                  amount: obj[k].amount
                });              
              break;
              case 'WeChatPay': 
                arr.push({
                  name: '微信',
                  amount: obj[k].amount
                });              
              break;
              case 'CreditCard': 
                arr.push({
                  name: '信用卡',
                  amount: obj[k].amount
                });              
              break;
            }
          }
        }
        return arr;
      }               
    },    
    watch: {
      isActivated (n,o) {
        if(n){
          this.init();
        }
      },
      page (){
        this.init();
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
    methods: {
      init () {
          this.$emit('open-loading');
          let params = {
            store_member_id: this.member.id,
            page: this.page,
            page_size: this.page_size,
            order_type: '2,3',
            //is_cross_order: 1,
            with_summary_data: 1,
            status: 'completed'
          }
          this.$http.get('/boss/order/list',{params}).then(res=>{
              this.data = res.data.items||[];
              this.total_count = parseInt(res.data.total_count);
              this.summary = res.data.summary;
              this.$emit('close-loading');
          });
      },
      pageChange (v) {
        this.page = v;
      }      
    },
    mounted () {
      _this = this;
    }
  }
</script>

<style scoped>

</style>