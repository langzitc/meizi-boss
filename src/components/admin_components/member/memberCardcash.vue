<!-- 会员卡金变动记录 -->
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
    name: 'MemberCardcash',
    data () {
      return {
          data: [],
          total_count: 0,
          page: 1,
          page_size: 6,          
          columns: [{
            title: '变动时间',
            key: 'created_at'
          },{
            title: '变动金额',
            key: 'amount'
          },{
            title: '剩余卡金',
            key: 'rest_amount'
          },{
            title: '备注',
            width: 300,
            key: 'comment'
          }]        
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
      page () {
         this.init();
      }             
    },     
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        }   
    },    
    methods: {
      init () {
          this.$emit('open-loading');
          let params = {
            type_code: 'CARD_AMOUNT',
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