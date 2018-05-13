<!-- 会员评价记录 -->
<template>
<div>
    <Card>
      <p slot="title">评价列表</p>
      <Card v-for="item in data" :key="item.id" style="margin-bottom: 10px">
        <Row :gutter="10">
            <i-col :xs="2">
              <Avatar icon="person" size="large" />
            </i-col>
            <i-col :xs="22">
              <Row :gutter="10" style="font-size:12px"> 
                  <i-col :xs="18">
                    <div><span style="margin-right:10px">评价类型:</span><Rate disabled allow-half show-text :value="item.rate"></Rate></div>
                    <div>{{item.content}}</div>
                  </i-col>
                  <i-col :xs="6" class="text-right">
                    <Button type="info" size="small" @click="reback(item)">回复</Button>
                  </i-col>
                  <i-col :xs="24">
                        <div v-if="item.$flag" style="margin-top: 15px">
                            <reply :id="item.id" :content="item.reply" @on-change="replayChange"></reply>
                        </div>                        
                  </i-col>
              </Row>
            </i-col>
        </Row>
      </Card>
      <div class="text-right" style="margin-top: 15px">
          <Page :current="page" @on-change="pageChange" :total="total_count" size="small"></Page>
      </div>        
    </Card>   
</div>
</template>

<script>
  import Reply from '../reply'
  export default {
    name: 'MemberTalk',
    data () {
      return {
        data: [],
        page: 1,
        page_size: 6,
        total_count: 0
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
    methods: {
      init () {
          this.$emit('open-loading');
          let params = {
            store_member_id: this.member.id,
            page: this.page,
            page_size: this.page_size
          }
          this.$http.post('/boss/review/list',{params}).then(res=>{
              let d = res.data.items;
              d.map(e=>{
                  e.rate = parseFloat(e.rate);
                  e.$flag = false;
                  e.id = parseInt(e.id);
              });
              this.total_count = parseInt(res.data.total_count);
              this.data = res.data.items;
              this.$emit('close-loading');
          });         
      },
      pageChange (v) {
        this.page = v;
      },
      reback (item) {
          item.$flag = true;
      },
      replayChange (flag,id,content) {
          if(flag){
              this.$http.post("/boss/review/createAndUpdate",{
                  id,
                  reply: content
              }).then(res=>{
                this.init();
              });
          }else{
              this.data.forEach((e,i)=>{
                  if(e.id === id){
                      e.$flag = false;
                  }
              })
          }
      },                    
    },
    mounted () {

    },
    components: {
      Reply
    }
  }
</script>

<style scoped>

</style>