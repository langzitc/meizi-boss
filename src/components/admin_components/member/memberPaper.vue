<!-- 会员奖金卷记录 -->
<template>
  <div>
    <Alert type="warning">
      奖金券总额：<span class="text-amount">{{total_amount}}</span>元,
      共计：<span class="text-amount">{{total_count}}</span>张
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
    name: 'MemberPaper',
    data () {
      return {
          total_count: 0,
          data: [],
          page: 1,
          page_size: 6,
          columns: [{
            title: '领取时间',
            key: 'created_at'
          },{
            title: '奖金券名称',
            key: 'title'
          },{
            title: '金额',
            key: 'amount'
          },{
            title: '状态',
            key: 'status_label'
          },{
            title: '有效期',
            key: 'expired_at'
          }]
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
        }       
    },    
    watch: {
      isActivated (n,o) {
        if(n){
          this.init();
        }
      },
      page () {
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
            //store_id: this.store_id,
            store_member_id: this.member.id,
            page: this.page,
            page_size: this.page_size
          }
          this.$http.post('/boss/storeMemberCoupon/list',params).then(res=>{
              this.data = res.data.items||[];
              this.total_count = parseInt(res.data.total_count);
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