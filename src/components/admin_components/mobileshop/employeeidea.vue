<template>
    <Card>
        <Alert slot="title" type="warning">
            <Row :gutter="20">
                <i-col :xs="12" :sm="6" :md="4">
                    <staff-select @staff-change="staffChange"></staff-select>
                </i-col>
                <i-col :xs="12" :sm="6" :md="4">
                    <Select placeholder="发长" v-model="params.category_id">
                        <Option v-for="el in categoryList" :key="el.id" :value="el.id">{{el.label}}</Option>
                    </Select>
                </i-col>
                <i-col :xs="12" :sm="6" :md="4">
                    <Select placeholder="脸型" v-model="params.face_model">
                        <Option v-for="el in faceModeList" :value="el.id" :key="el.id">{{el.label}}</Option>
                    </Select>                  
                </i-col>
                <i-col :xs="12" :sm="6" :md="4">
                    <Select placeholder="性别" v-model="params.gender">
                        <Option v-for="el in genderList" :key="el.value" :value="el.value">{{el.label}}</Option>
                    </Select>                    
                </i-col>
                <i-col :xs="24" :sm="24" :md="8" class="text-right">
                    <add-tag @on-change="tagChange" :tagList="tagList" :categoryList="categoryList" :faceModeList="faceModeList"></add-tag>
                    <upload-idea @on-change="ideaChange" :tagList="tagList" :categoryList="categoryList" :faceModeList="faceModeList" style="margin-left:20px"></upload-idea>
                </i-col>                                                                
            </Row>
        </Alert>
        <Card>
            <Row slot="title">
              <i-col :xs="12" style="line-height:30px">
                  作品列表
              </i-col>
              <i-col :xs="12" class="text-right">
                  <Input type="text" v-model="searchText" placeholder="输入关键字搜索" style="width:200px"></Input>
                  <Button type="primary" @click="search">搜索</Button>
              </i-col>
            </Row>
            <Table :loading="loading" border :data="data" :columns="columns"></Table>
            <div class="text-right" style="margin-top: 15px">
                <Page :current="params.page" @on-change="pageChange" :total="total_count" size="small"></Page>
            </div>              
        </Card>
        <Modal
          title="作品图片"
          :width="600"
          v-model="carousel.state"
        > 
          <div slot="footer">
            <Button type="ghost" @click="carousel.state=false">
                关闭
            </Button>
          </div>
          <Carousel v-if="carousel.state" autoplay v-model="carousel.value" loop>
              <CarouselItem v-for="el in carousel.list" :key="el.id">
                  <img :src="el.url" width="100%" height="400px">
              </CarouselItem>
          </Carousel>          
        </Modal>
    </Card>
</template>

<script>
  import StaffSelect from '../staff_select'
  import AddTag from './addTag'
  import UploadIdea from './uploadIdea'
  let _this;
  export default {
    name: 'shop-employeeidea',
    data () {
      return {
        loading: false,
        total_count: 0,
        data: [],
        searchText: '',
        carousel: {
          state: false,
          list: [],
          value: 0
        },
        columns: [{
          title: '作品',
          align: 'center',
          width: 150,
          render (h,p) {
            if(p.row.images.length){
              return h('div',{
                style: {
                  width: '115px',
                  height: '120px',
                  lineHeight: '120px'
                },
                on: {
                  click (){
                    _this.showLoopPicture(p.row.images);
                  }
                }
              },[
                h('img',{
                  attrs: {
                    src: p.row.images[0].url,
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
          title: '创作员工',
          key: 'employee_name',
          width: 100
        },{
          title: '访问量',
          key: 'hits',
          width: 100
        },{
          title: '分类',
          width: 100,
          render (h,p) {
            let str = "";
            _this.categoryList.forEach(e=>{
              if(e.id == p.row.category_id){
                str = e.label;
              }
            })
            return str;
          }
        },{
          title: '标签',
          width: 150,
          render (h,p) {
            let arr = [];
            p.row.tags.forEach(e=>{
              arr.push(h('Tag',{
                props: {
                  color: 'blue'
                }
              },e.label));
            })
            return h('span',arr);
          }
        },{
          title: '描述',
          className: 'table-ellipsis',
          key: 'description',
          width: 150
        },{
          title: '创建时间',
          key: 'created_at',
          width: 150
        },{
          title: '序号',
          key: 'sort',
          width: 100
        },{
          title: '操作',
          align: 'right',
          width: 150,
          fixed: 'right',
          render (h,p) {
            return h('span',[
              h(UploadIdea,{
                props: {
                  title: '编辑作品',
                  id: parseInt(p.row.id),
                  tagList: _this.tagList,
                  categoryList: _this.categoryList,
                  faceModeList: _this.faceModeList
                },
                on: {
                  'on-change' () {
                    _this.ideaChange();
                  }
                }
              },[
                h('Button',{
                  props: {
                    type: 'info',
                    size: 'small'
                  }                  
                },'编辑')
              ]),
              h('Button',{
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click (){
                    _this.$Modal.confirm({
                      title: '系统提示',
                      content: '确认删除？',
                      onOk: ()=>{
                        _this.$http.post("/boss/employeeWorks/delete",{
                          id: p.row.id
                        }).then(res=>{
                          _this.$Message.success(res.message);
                          _this.ideaChange();
                        });
                      }
                    });
                  }
                },
                style: {
                  marginLeft: '15px'
                }
              },'删除')                            
            ])
          }
        }],
        params: {
          page: 1,
          page_size: 10,
          store_id: '',
          employee_id: '',
          category_id: '',
          face_model: '',
          gender: ''
        },
        categoryList: [],
        faceModeList: [],
        tagList: []
      }
    },
    computed: {
      store_id () {
        return this.$store.state.story.store_id;
      },
      genderList () {
        return this.$store.state.user.genderList;
      }
    },
    watch: {
      store_id () {
        this.params.store_id = this.store_id;
      },
      params: {
        deep: true,
        handler: ()=>{
          _this.getData();
        }
      }
    },
    methods: {
      staffChange (v) {
          this.params.employee_id = v.id;
      },
      pageChange (v) {
          this.params.page = v;
      },
      tagChange () {
          this.getCategoryList();
          this.getTagList();
          this.getFaceModeList();  
      },
      ideaChange () {
        this.getData();
      },
      showLoopPicture (imgarr) {
        this.carousel.list = imgarr;
        this.carousel.state = true;
      },
      getData (keywords) {
          let params = JSON.parse(JSON.stringify(this.params));
          for(let k in params){
            if(params[k] === ''){
              delete params[k];
            }
          }
          if(keywords){
            params.keywords = keywords;
          }
          this.loading = true;
          this.$http.get("/boss/employeeWorks/list",{params}).then(res=>{
            this.total_count = parseInt(res.data.total_count);
            this.data = res.data.items;
            this.loading = false;
          })
      },
      getCategoryList () {
          this.$http.get('/boss/storeOption/list',{
            params: {
              code: 'CATEGORY'
            }
          }).then(res=>{
              this.categoryList = res.data;
          })
      },
      getTagList () {
          this.$http.get('/boss/storeOption/list',{
            params: {
              code: 'TAG'
            }
          }).then(res=>{
              this.tagList = res.data;
          })
      },
      getFaceModeList () {
          this.$http.get('/boss/storeOption/list',{
            params: {
              code: 'FACE_MODEL'
            }
          }).then(res=>{
              this.faceModeList = res.data;
          })
      },
      search () {
        this.getData(this.searchText);
      }            
    },
    mounted () {
      _this = this;
      this.tagChange();    
      if(this.store_id){
        this.getData();
      }
    },
    components: {
      StaffSelect,
      AddTag,
      UploadIdea
    }
  }
</script>

<style scoped>
</style>
