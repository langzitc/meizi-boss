<template>
  <Card>
    <Alert slot="title" type="info" style="padding: 10px 15px">
      <Row>
        <i-col :xs="12" style="line-height:30px">
          图片统计: 共<span class="text-amount">{{total_count}}</span>张图片
        </i-col>
        <i-col :xs="12" class="text-right">
          <addlooppic @on-change="getData"></addlooppic>
        </i-col>
      </Row>
    </Alert>
    <Card>
      <Row slot="title">
        <i-col :xs="12" style="line-height:30px">轮播图片列表</i-col>
        <i-col :xs="12" class="text-right">
          <Select class="text-left" placeholder="使用状态" v-model="params.is_active" clearable style="width: 100px">
            <Option value="1">激活</Option>
            <Option value="0">未激活</Option>
          </Select>
          <Input type="text" placeholder="输入图片名称搜索" style="width:200px" v-model="keyword"></Input>
          <Button type="info" size="small" @click="search">筛选</Button>
        </i-col>
      </Row>
      <Table :data="data" :columns="columns" :loading="loading"></Table>        
    </Card>
  </Card>
</template>

<script>
  import Addlooppic from './addLooppicModal'
  let _this;
  let backData = [];
  export default {
    name: 'shop-looppic',
    data () {
      return {
        data: [],
        columns: [{
          title: '图片名称',
          key: 'title'
        },{
          title: '上传时间',
          key: 'created_at'
        },{
          title: '排列顺序',
          key: 'sort_order'
        },{
          title: '图片',
          render (h,p){
              if(p.row.path_url){
                return h('div',{
                  style: {
                    width: '115px',
                    height: '120px',
                    lineHeight: '120px'
                  },
                  on: {
                    click (){
                      _this.showLoopPicture(p.row.path_url);
                    }
                  }
                },[
                  h('img',{
                    attrs: {
                      src: p.row.path_url,
                      width: "100px",
                      height: '100px'                
                    }
                  })                  
                ])
              }else{
                return "-";
              }        
          }
        },{
          title: '操作',
          width: 200,
          align: 'right',
          render (h,p){
            return h('span',[
              h(Addlooppic,{
                props: {
                  id: parseInt(p.row.id)
                },
                on: {
                  'on-change' () {
                    _this.getData();
                  }
                }
              },[
                h("Button",{
                  props: {
                    type: 'info',
                    size: 'small'
                  }
                },"编辑")
              ]),
              h("Button",{
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click () {
                    _this.$Modal.confirm({
                      title: '系统提示',
                      content: '确认删除?',
                      onOk: ()=>{
                        _this.$http.post("/boss/storeBanner/delete",{id: p.row.id}).then(res=>{
                          _this.$Message.success(res.message);
                          _this.getData();
                        });
                      }
                    });
                  }
                }
              },"删除")                             
            ])          
          }
        }],
        loading: false,
        keyword: '',
        params: {
          store_id: '',
          code: 'Banner',
          is_active: ''
        }  
      }
    },
    computed: {
      store_id () {
        return this.$store.state.story.store_id;
      },
      total_count () {
        return this.data.length;
      }
    },
    watch: {
      store_id () {
        this.params.store_id = this.store_id;
      },
      params: {
        deep: true,
        handler: (n,o)=>{
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
        this.$http.get('/boss/storeBanner/list',{params}).then(res=>{
          this.data = res.data;
          backData = res.data;
          this.loading = false;
        })
      },
      search () {
        if(this.keyword) {
          this.data = backData.filter(e=>{
            return e.title.includes(this.keyword);
          })
        }else{
          this.data = backData;
        }
      },
      showLoopPicture (path) {
        this.$Modal.confirm({
          title: '预览',
          width: '700',
          okText: '关闭',
          cancelText: '.',
          render: (h)=>{
            return h('img',{
              style: {
                width: '100%',
                height: '200px'
              }
            })
          }
        });
      }
    },
    mounted () {
      _this = this;
      if(this.store_id){
        this.params.store_id = this.store_id;
      }
    },
    components: {
      Addlooppic
    }
  }
</script>

<style scoped>

</style>
