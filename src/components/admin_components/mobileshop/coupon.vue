<template>
  <Card>
    <Alert type="info">
        <Row :gutter="20">
            <i-col :xs="8">
              <Select placeholder="全部代金卷" v-model="params.status" style="width: 200px">
                  <Option value="0">未使用</Option>
                  <Option value="1">已经使用</Option>
                  <Option value="2">已经过期</Option>
              </Select>              
            </i-col>
            <i-col :xs="16" style="line-height: 30px">
              奖金券统计: 共计<span class="text-amount">{{total_amount}}</span>元
                         <span class="text-amount">{{total_num}}</span>张
              (
                已使用: <span class="text-amount">{{ysy_amount}}</span>元,
                未使用: <span class="text-amount">{{wsy_amount}}</span>元,
                已过期: <span class="text-amount">{{ygq_amount}}</span>元
              )           
            </i-col>
        </Row>
    </Alert>
    <Card>
      <Row slot="title">
          <i-col :xs="12">奖金卷奖励记录</i-col>
          <i-col :xs="12" class="text-right">
            <Input placeholder="输入关键字搜索" v-model="params.keywords" style="width: 200px">
            </Input>
          </i-col>
      </Row>
      <Table :loading="loading" border :data="data" :columns="columns"></Table>
      <div class="text-right" style="margin-top: 15px">
          <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
      </div>         
    </Card>
  </Card>
</template>

<script>
  let _this;
  export default {
    name: 'shop-coupon',
    data () {
      return {
        total_count: 0,
        data: [],
        columns: [{
          title: '会员',
          width: 120,
          render(h,p){
            return h("div",[
              h('span',p.row.store_member_name),
              h('br'),
              h('span',p.row.store_member_mobile)
            ])
          }
        },{
          title: '奖卷名称',
          key: 'title'
        },{
          title: '奖券类型',
          key: 'discount_type_label'
        },{
          title: '奖金券金额',
          key: 'amount'
        },{
          title: '领取时间',
          key: 'updated_at',
          width: 150
        },{
          title: '到期时间',
          key: 'expired_at',
          width: 150
        },{
          title: '使用状态',
          key: 'status_label'
        },{
          title: '领取说明',
          key: 'comment'
        }],
        loading: false,
        params: {
          page: 1,
          page_size: 10,
          status: '',
          store_id: '',
          with_store_member_info: 1
        }
      }
    },
    computed: {
      store_id () {
        return this.$store.state.story.store_id;
      },
      total_amount () {
        let n = 0;
        this.data.forEach(e=>{
            n+=parseFloat(e.amount);
        }) 
        return n.toFixed(2); 
      },
      total_num () {
        return this.data.length;
      },
      ysy_amount () {
        let n = 0;
        this.data.forEach(e=>{
            if(e.status == 1){
              n+=parseFloat(e.amount);
            }
        }) 
        return n.toFixed(2); 
      },
      wsy_amount () {
        let n = 0;
        this.data.forEach(e=>{
            if(e.status == 0){
              n+=parseFloat(e.amount);
            }
        }) 
        return n.toFixed(2);         
      },
      ygq_amount () {
        let n = 0;
        this.data.forEach(e=>{
            if(e.status == 2){
              n+=parseFloat(e.amount);
            }
        }) 
        return n.toFixed(2); 
      }
    },
    watch: {
      store_id (n,o) {
        this.params.store_id = n;
      },
      params: {
          deep: true,
          handler: ()=>{
            _this.getData();
          }
      }
    },
    methods: {
      getData () {
        this.loading = true;
        let params = JSON.parse(JSON.stringify(this.params));
        for(let k in params){
          if(params[k] === ''){
            delete params[k];
          }
        }
        this.$http.get('/boss/storeMemberCoupon/list',{params}).then(res=>{
          this.data = res.data.items;
          this.total_count = parseInt(res.data.total_count);
          this.loading = false;
        });
      },
      pageChange (v) {
        this.params.page = v;
      }
    },
    mounted () {
      _this = this;
      if(this.store_id) {
        this.params.store_id = this.store_id;
      }
    }
  }
</script>

<style scoped>

</style>
