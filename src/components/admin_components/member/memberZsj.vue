<!-- 会员赠送金 -->
<!-- 会员开卡充值记录 -->
<template>
  <div>
    <Table border :data="data" :columns="columns" size="small" stripe></Table>
    <div class="text-right" style="margin-top: 15px">
        <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>
    </div>    
  </div>
</template>

<script>
  let _this;
  export default {
    name: 'MemberZsj',
    data () {
      return {
          total_count: 0,
          data: [],
          page: 1,
          page_size: 6,
          columns: [{
            title: '变动时间',
            key: 'created_at'
          },{
            title: '变动金额',
            key: 'amount'
          },{
            title: '剩余金额',
            key: 'rest_amount'
          },{
            title: '备注',
            width: 300,
            key: 'comment'
          }]         
      }
    },
    computed: {
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
            type_code: 'CARD_GIVEN_AMOUNT',
            id: this.member.id,
            page: this.page,
            page_size: this.page_size
          }
          this.$http.get('/boss/storeMember/cardAmountHistory',{params}).then(res=>{
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