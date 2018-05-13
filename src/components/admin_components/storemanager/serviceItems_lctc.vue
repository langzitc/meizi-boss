<template>
  <div>
    <Card class="clearfix" style="padding-bottom: 20px">
      <i-col :sm="12" class="text-left">
        <select-store style="width:200px"></select-store>
        <Select v-model="status"  @on-change="dataInit" style="width: 200px" placeholder="套餐状态">
          <Option value="">全部套餐</Option>
          <Option :value="1">已上架</Option>
          <Option :value="0">已下架</Option>
        </Select>        
      </i-col>
      <i-col :sm="12" class="text-right">
        <Button icon="android-add" @click="addTypeModal" v-show="store_id">添加类型</Button>
        <Button icon="android-add" @click="addServiceModal" v-show="store_id">添加疗程套餐</Button>
        <Modal
          v-model="types.modal_add_state"
          ok-text="保存"
          :loading="types.modal_add_state"
          @on-ok="handleTypeAdd"
          class-name="modal-scroll"
          :mask-closable="false"
          @on-cancel="handleTypeCancel"
          :title="types.modalTitle">
                <div slot="footer">
                    <Button type="text" size="large" @click="handleTypeCancel">取消</Button>
                    <Button type="primary" size="large" @click="handleTypeAdd">保存</Button>
                </div>          
                <Form ref="addServiceTypeForm" :model="typeItems">
                    <FormItem
                            v-for="(item, index) in typeItems.items"
                            :key="index"
                            :prop="'items.' + index + '.name'"
                            :rules="{required: true, message: '类型名称不能为空', trigger: 'blur'}">
                        <Row>
                            <Col span="14">
                            <Input type="text" v-model="item.name" placeholder="请输入..."></Input>
                            </Col>
                            <Col span="9" offset="1">
                            <Button  type="text" @click="handleTypeItemDelete(item.id)">删除</Button>
                            <Button  type="text" @click="handleTypeItemSave(item.id,item.name)">保存</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                <hr>
                <Form ref="addServiceTypeForm2" :model="types.formDynamic">
                    <FormItem
                            v-for="(item, index) in types.formDynamic.items"
                            :key="index"
                            :prop="'items.' + index + '.name'"
                            :rules="{required: true, message: '类型名称不能为空', trigger: 'blur'}">
                        <Row>
                            <Col span="14">
                            <Input type="text" v-model="item.name" placeholder="请输入..."></Input>
                            </Col>
                            <Col span="9" offset="1">
                            <Button icon="android-remove" @click="handleTypeRemove(index)"></Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                            <Button icon="android-add" @click="handleTypeItemAdd"></Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
        </Modal>
        <Modal
          v-model="service.modal_add_state"
          class-name="modal-scroll"
          :loading="service.modal_add_state"
          width="850"
          :mask-closable="false"
          :title="service.modalTitle">
            <div slot="footer">
                <Button type="text" size="large" @click="handleServiceCancel">取消</Button>
                <Button type="primary" size="large" @click="handleServiceAdd">保存</Button>
            </div>              
          <Form ref="addServiceForm" :label-width="100" :model="service.formValidate" :rules="service.ruleValidate" class="clearfix">
            <FormItem label="项目编号" prop="sku" style="width: 360px">
                <Input type="text" placeholder="请输入..." v-model="service.formValidate.sku"></Input>
            </FormItem>
            <FormItem label="项目名称" prop="name" style="width: 360px">
              <Input type="text" placeholder="请输入..." v-model="service.formValidate.name"></Input>
            </FormItem>
            <FormItem label="项目类型" prop="category_ids" style="width: 360px">
                <Select v-model="service.formValidate.category_ids" placeholder="选择类型">
                    <Option v-for="item in types.typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>                
            </FormItem>
            <FormItem label="项目价格" prop="price" style="width: 360px">
                <Input type="text" placeholder="请输入..." v-model="service.formValidate.price">
                    <span slot="append">元</span>
                </Input>
            </FormItem>
            <FormItem label="所属部门" prop="department_id" style="width: 360px">
                <Select v-model="service.formValidate.department_id" placeholder="选择部门">
                    <Option v-for="item in service.departmentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>    
            </FormItem> 
            <FormItem label="套餐内容" style="width: 100%">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>项目编号</th>
                        <th>项目名称</th>
                        <th>原价</th>
                        <th>次数</th>
                        <th>价格</th>
                        <th>单次价</th>
                        <th>有效期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="el in service.formValidate.grouped_service" :key="el.name" v-if="service.formValidate.grouped_service.length">
                        <td>{{el.sku}}</td>
                        <td>{{el.name}}</td>
                        <td>{{el.origin_price}}</td>
                        <td><Input type="text" v-model="el.qty" style="width: 80px"></Input></td>
                        <td>
                          <Input type="text" v-model="el.price" style="width: 80px">
                            <span slot="append">元</span>
                          </Input>
                        </td>
                        <td>
                          <Input type="text" v-model="el.single_price" style="width: 80px">
                            <span slot="append">元</span>
                          </Input>                          
                        </td>
                        <td>
                            <DatePicker :transfer="true" v-model="el.expired_at" type="date" style="width: 100px"></DatePicker>                          
                        </td>
                      </tr>
                      <tr v-if="!service.formValidate.grouped_service.length">
                        <td colspan="7" class="text-center text-muted">请添加服务项目</td>
                      </tr>
                      <tr>
                        <td colspan="7">
                            <Select @on-change="mutiSelectChange" :transfer="true" v-model="selectService" placeholder="选择添加服务项目" filterable multiple>
                                <Option v-for="item in serviceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            </FormItem>               
            <FormItem label="项目主图" style="width: 360px">
                <Upload
                    type="drag"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :data="uploadParams"                  
                    :action="uploadURL">
                    <div style="padding: 20px 0" v-show="!service.filePath">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或者拖拽上传图片</p>
                    </div>
                    <div style="padding: 20px 0" v-show="service.filePath">
                        <img :src="service.filePath" alt="" style="width: 100%">
                    </div>                    
                </Upload>
            </FormItem> 
            <FormItem label="项目介绍">
                <textarea :id="editId"></textarea>
            </FormItem>                                                            
          </Form>
        </Modal>        
      </i-col>
    </Card>
    <Card v-if="store_id">
      <div slot="title" class="text-right">
        <Input icon="ios-search" v-model="keywords" placeholder="输入关键字..." style="width: 200px"></Input>
      </div>
      <div>
        <Table border :columns="service.columns"  :loading="loading" :data="service.data"></Table>
        <div class="text-right" style="margin-top: 15px">
            <Page :current="service.page" @on-change="pageChange" :total="service.total_count" size="small"></Page>
        </div>
      </div>
    </Card>
    <Card v-if="!store_id">
      <div class="text-center">
        <Alert type="warning">
          <h5>请选择门店</h5>
        </Alert>
      </div>
    </Card>
  </div>    
</template>

<script>
import tinymce from 'tinymce'
import util from '../../../util'
import SelectStore from '../store_select'
let _this = null;
let date = (new Date()).getTime();
export default {
    name: 'ServiceItemsLctc',
    data (){
        return {
            keywords: '',
            serviceList: [],
            selectService: [],
            loading: false,
            status: '',
            types: {
                modal_add_state: false,
                modalTitle: '添加服务类型',
                typeList: [],
                formDynamic: {
                    items: [
                        {
                            name: '',
                            store_id: 0,
                            type_code: 'grouped_service'
                        }
                    ]
                }              
            },
            service: {
                modal_add_state: false,
                modalTitle: '添加服务项目',
                total_count: 0,
                page: 1,
                page_size: 10,
                filePath: '',
                departmentList: [],
                formValidate: {
                    type_code: 'grouped_service',
                    name: '',
                    sku: '',
                    category_ids: '',
                    images: '',
                    price: '',
                    department_id: '',
                    description: '',
                    grouped_service: []
                },
                ruleValidate: {
                   name: [
                       { required: true, message: '服务项目名称不能为空', trigger: 'blur' }
                   ],
                   sku: [
                       { required: true, message: '服务项目编号不能为空', trigger: 'blur' }
                   ],
                   category_ids: [
                       { required: true, message: '服务项目类型不能为空', trigger: 'blur' }
                   ], 
                   price: [
                       { required: true, message: '服务项目价格不能为空', trigger: 'blur' }
                   ],
                   department_id: [
                       { required: true, message: '部门不能为空', trigger: 'blur' }
                   ]                    
                },
                data: [],
                columns: [{
                    title: '编号',
                    key: 'sku'
                },{
                    title: '项目名称',
                    key: 'name'
                },{
                    title: '类型',
                    key: 'category_ids',
                    render(h,p){
                        let arr = [];
                        p.row.selected_category_options.map(e=>{
                            arr.push(e.label);
                        })
                        return arr.join(",");
                    }
                },{
                    title: '原价',
                    key: 'price'
                },{
                    title: '部门',
                    render(h,p){
                        let dn = "";
                        _this.service.departmentList.map(e=>{
                            if(e.id == p.row.department_id){
                                dn = e.name;
                            }
                        })
                        return dn;
                    }
                },{
                    title: '状态',
                    key: 'status_label'
                },{
                    title: '操作',
                    className: 'mzmy-table-oper',
                    render(h,p){
                        let el = [
                            h('a',{
                                on: {
                                    click(e){
                                        _this.$http.get("/boss/product/info",{params: {id: p.row.id}}).then((res)=>{
                                              _this.service.modal_add_state = true;
                                              _this.service.modalTitle = "编辑套餐";   
                                              util.clone(_this.service.formValidate,res.data);
                                              _this.service.formValidate.id = res.data.id;
                                              _this.service.formValidate.images = res.data.image_path;
                                              _this.service.filePath = res.data.image_url;
                                              _this.service.formValidate.category_ids = res.data.category_ids[0];
                                              _this.service.formValidate.grouped_service.map(e=>{
                                                Object.defineProperty(e,"single_price",{
                                                  get (){
                                                    return (this.price/this.qty).toFixed(2);
                                                  }                                                   
                                                })
                                              });
                                              let arr = [];
                                              res.data.grouped_service.map(e=>{
                                                  arr.push(e.product_id);
                                              });
                                              _this.selectService = arr;
                                              tinymce.get(_this.editId).setContent(_this.service.formValidate.description);                                            
                                        });                                      
                                    }
                                }
                            },'编辑'),
                            h('a',{
                                on: {
                                    click(e){
                                            _this.$Modal.confirm({
                                                title: '系统提示',
                                                content: '<h4 class="text-warning text-center">确认删除？</h4>',
                                                onOk: ()=>{
                                                    _this.$http.post("/boss/product/delete",{id: p.row.id}).then(res=>{
                                                        _this.$Message.success(res.message);
                                                        _this.getServiceList();
                                                    })
                                                }
                                            });  
                                    }
                                }
                            },'删除')                            
                        ];
                        if(p.row.status == 1){
                            el.push(
                                h('a',{
                                    on: {
                                        click(e){
                                            if(p.row.status == 1){
                                                _this.$Modal.confirm({
                                                    title: '系统提示',
                                                    okText: '狠心下架',
                                                    content: '<h5 class="text-warning text-center">提示套餐下架后，将不可订购。请谨慎操作！</h5>',
                                                    onOk: ()=>{
                                                        _this.$http.post("/boss/product/update",{id: p.row.id,status: 0}).then(res=>{
                                                            _this.$Message.success(res.message);
                                                            _this.getServiceList();
                                                        })
                                                    }
                                                });                                        
                                            }
                                        }
                                    }
                                },'下架')                                
                            );
                        }
                        return h('div',el);
                    }
                }]                                
            }
        }
    },
    computed: {
        typeItems (){
            return {
                items: this.types.typeList
            }            
        },
        uploadURL (){
            return `${API_PATH}/store/upload`;
        },
        uploadParams (){
            return {sid: this.$store.state.user.sid};
        },
        store_id () {
            return this.$store.state.story.store_id;
        },
        departList () {
            return this.$store.state.story.departList;
        },
        editId () {
            return 'edit'+date;
        }                              
    },
    watch: {
        store_id () {
            this.dataInit();
        },
        departList () {
            this.service.departmentList = this.departList;
        }
    },    
    methods: {
        dataInit () {
            this.types.formDynamic.items.map(e=>{
                e.store_id = this.store_id;
            })
            this.getServiceList();
            this.getTypeList();
            this.getServiceList2();               
        },
        mutiSelectChange (v){
          let d = this.service.formValidate.grouped_service;
          if(v.length>d.length){
            this.serviceList.map(e=>{
              if(e.id == v[v.length-1]){
                d.push({
                  product_id: e.id,
                  name: e.name,
                  sku: e.sku,
                  origin_price: e.price,
                  price: 0.00,
                  qty: 1,
                  expired_at: '',
                  get single_price(){
                    return (this.price/this.qty).toFixed(2);
                  } 
                });
              }
            })            
          }else{
            d.map((e,i)=>{
              let flag = true;
              v.map(n=>{
                if(n == e.product_id){
                  flag = false;
                }
              })
              if(flag){
                d.splice(i,1);
              }
            })
          }
        },
        handleTypeAdd (){
            this.$refs['addServiceTypeForm2'].validate(valid=>{
                if(valid){
                    let params = this.types.formDynamic.items;
                    this.$http.post("/boss/category/batchCreate",{params}).then((res)=>{
                        this.$Message.success(res.message);
                        this.getTypeList();
                        this.$refs['addServiceTypeForm2'].resetFields();
                        this.types.formDynamic.items = [{
                            name: '',
                            store_id: this.store_id,
                            type_code: 'grouped_service'
                        }];                        
                    });                    
                }else{
                    this.$Message.error("表单填写有误");
                }
            })
        },
        handleTypeCancel (){
            this.types.modal_add_state = false;
            this.$refs['addServiceTypeForm2'].resetFields();
        },
        handleServiceAdd (){
            let url = "/boss/product/create";
            if(this.service.formValidate.id){
                url = "/boss/product/update";
            }
            this.$refs['addServiceForm'].validate(valid=>{
                if(valid){
                    this.service.formValidate.description = tinymce.get(this.editId).getContent();
                    let params = JSON.parse(JSON.stringify(this.service.formValidate));
                    params.store_id = this.store_id;
                    params.grouped_service.map(e=>{
                      if(e.expired_at instanceof Date){
                        e.expired_at = e.expired_at.Format("yyyy-MM-dd");
                      }
                    });
                    this.$http.post(url,params).then(res=>{
                        this.$Message.success(res.message);
                        this.service.modal_add_state = false;
                        this.getServiceList();
                        this.$refs['addServiceForm'].resetFields();
                    });
                }else{
                    this.$Message.error("表单填写有误");
                }
            })
        },
        handleServiceCancel (){
            this.service.modal_add_state = false;
            this.$refs['addServiceForm'].resetFields();
        },    
        handleTypeItemDelete (id){
            this.$Modal.confirm({
                title: '系统提示',
                content: '<h4 class="text-warning text-center">确认删除？</h4>',
                onOk: ()=>{
                    this.$http.post("/boss/category/delete",{id}).then((res)=>{
                        this.$Message.success(res.message);
                        this.getTypeList();
                    });
                }
            });            
        }, 
        handleTypeItemSave (id,name){
            this.$http.post("/boss/category/update",{id,name}).then((res)=>{
                this.$Message.success(res.message);
                this.getTypeList();
            });
        },   
        handleTypeRemove (index){
            this.types.formDynamic.items.splice(index,1);
        },
        handleTypeItemAdd () {
            this.types.formDynamic.items.push({
                name: '',
                store_id: this.store_id,
                type_code: 'grouped_service'
            });
        },
        addTypeModal (){
            this.types.modal_add_state = true;
        },
        addServiceModal (){
            this.service.modal_add_state = true;
            this.service.modalTitle = "添加套餐";
            if(this.service.formValidate.id){
                delete this.service.formValidate.id;
                this.service.filePath = "";
                this.$refs['addServiceForm'].resetFields();
            }
        },
        getTypeList (){
            if(this.store_id){
                this.$http.get("/boss/category/list",{params: {type_code: 'grouped_service',store_id: this.store_id}}).then((res)=>{
                    this.types.typeList = res.data;
                });
            }
        },
        getServiceList2 (){
             if(this.store_id){
                let params = {
                    store_id: this.store_id,
                    type_code: "service"
                };
                this.$http.get("/boss/product/list",{params}).then((res)=>{
                    this.serviceList = res.data.items; 
                });
            }         
        },
        getServiceList (){
            if(this.store_id){
                let params = {
                    store_id: this.store_id,
                    page: this.service.page,
                    page_size: this.service.page_size,
                    type_code: "grouped_service"
                };
                if(this.status){
                  params.status = this.status;
                }
                if(this.keywords){
                    params.name = this.keywords;
                }
                this.loading = true;
                this.$http.get("/boss/product/list",{params}).then((res)=>{
                    this.service.data = res.data.items;
                    this.service.total_count = parseInt(res.data.total_count);  
                    this.loading = false;
                });
            }
        },
        handleSuccess (res, file) {
            this.service.filePath = res.data.file.full_url;
            this.service.formValidate.images = res.data.file.path;
        },
        handleError () {
            this.$Message.error("图片上传失败");
        },
        handleFormatError (file) {
            this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: '文件 ' + file.name + ' 格式错误, 请上传 jpg 或者 png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: '文件  ' + file.name + ' 不能超过2M'
            });
        },
        pageChange (p){
            this.service.page = p;
            this.getServiceList();
        }              

    },
    components: {
        SelectStore
    },    
    mounted (){ 
      _this = this;  
      if(this.store_id){
          this.dataInit();
      }
      if(this.departList.length){
          this.service.departmentList = this.departList;
      }
      tinymce.init({
        selector: '#'+this.editId,
        branding: false,
        elementpath: false,
        height: 400,
        language: 'zh_CN.GB2312',
        menubar: 'edit insert view format table tools',
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
          'searchreplace visualblocks visualchars code fullscreen fullpage',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
        autosave_interval: '20s',
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        }
      });        
    },
    destroyed (){
        tinymce.get(this.editId).destroy();
    }
}
</script>

<style>

</style>
