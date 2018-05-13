<template>
  <div>
    <Card class="clearfix" style="padding-bottom: 20px">
      <i-col :sm="12" class="text-left">
          <div style="width:200px">
              <select-store style="width:200px"></select-store>
          </div>
      </i-col>
      <i-col :sm="12" class="text-right">
        <Button icon="android-add" @click="addTypeModal" v-show="store_id">添加类型</Button>
        <Button icon="android-add" @click="addServiceModal" v-show="store_id">添加服务项目</Button>
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
          ok-text="保存"
          class-name="modal-scroll"
          :loading="service.modal_add_state"
          width="750"
          :mask-closable="false"
          :title="service.modalTitle">
            <div slot="footer">
                <Button type="text" size="large" @click="handleServiceCancel">取消</Button>
                <Button type="primary" size="large" @click="handleServiceAdd">保存</Button>
            </div>              
          <Form ref="addServiceForm" :label-width="100" :model="service.formValidate" :rules="service.ruleValidate" class="clearfix">
            <FormItem label="项目编号" prop="sku" class="col-sm-6">
                <Input type="text" placeholder="请输入..." v-model="service.formValidate.sku"></Input>
            </FormItem>
            <FormItem label="项目名称" prop="name" class="col-sm-6">
              <Input type="text" placeholder="请输入..." v-model="service.formValidate.name"></Input>
            </FormItem>
            <FormItem label="项目类型" prop="category_ids" class="col-sm-6">
                <Select v-model="service.formValidate.category_ids" placeholder="选择类型">
                    <Option v-for="item in types.typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>                
            </FormItem>
            <FormItem label="所属部门" prop="department_id" class="col-sm-6">
                <Select v-model="service.formValidate.department_id" placeholder="选择部门">
                    <Option v-for="item in service.departmentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>    
            </FormItem>
            <FormItem label="价格" prop="price" class="col-sm-6">
                <Input type="text" placeholder="请输入..." v-model="service.formValidate.price">
                    <span slot="append">元</span>
                </Input>
            </FormItem> 
            <FormItem label="特价" class="col-sm-6">
                <Input type="text" placeholder="请输入..." v-model="service.formValidate.special_price">
                    <span slot="append">元</span>
                </Input>
            </FormItem> 
            <FormItem label="特价开始时间" class="col-sm-6">
                <DatePicker :transfer="true" type="date" :value="service.formValidate.special_price_start_at" @on-change="spsChange" placeholder="选择开始时间" style="width: 100%"></DatePicker>
            </FormItem> 
            <FormItem label="特价结束时间" class="col-sm-6">
                <DatePicker :transfer="true" type="date" :value="service.formValidate.special_price_end_at" @on-change="speChange"  placeholder="选择结束时间" style="width: 100%"></DatePicker>
            </FormItem>                                     
            <FormItem label="职位价格设置" class="col-sm-12">
                <Tabs type="card">
                    <TabPane v-for="el in service.advanced_price" :label="el.$name" :key="el.job_title_id">
                        <Row>
                            <i-col :xs="24">
                                <RadioGroup v-model="el.$type">
                                    <Radio label="tysz">统一设置</Radio>
                                    <Radio label="ddsz">单独设置</Radio>
                                </RadioGroup>                                
                            </i-col>
                        </Row>
                        <Row :gutter="10" v-if="el.$type==='tysz'">
                            <i-col :xs="6"><Input v-model="el.price" type="text" placeholder="价格"></Input></i-col>
                            <i-col :xs="6"><Input v-model="el.special_price" type="text" placeholder="特价"></Input></i-col>
                            <i-col :xs="6">
                                <DatePicker :transfer="true" placement="left" v-model="el.special_price_start_at" type="date" placeholder="选择开始时间" style="width: 100%"></DatePicker>
                            </i-col>
                            <i-col :xs="6">
                                <DatePicker :transfer="true" placement="left" v-model="el.special_price_end_at" type="date"  placeholder="选择结束时间" style="width: 100%"></DatePicker>
                            </i-col>                            
                        </Row>
                        <Row :gutter="10" v-for="el2 in el.children" :key="el2.id" v-if="el.$type==='ddsz'">
                            <i-col :xs="4">{{el2.$name}}</i-col>
                            <i-col :xs="4"><Input v-model="el2.price" type="text" placeholder="价格"></Input></i-col>
                            <i-col :xs="4"><Input v-model="el2.special_price" type="text" placeholder="特价"></Input></i-col>
                            <i-col :xs="6">
                                <DatePicker :transfer="true" placement="left" v-model="el2.special_price_start_at" type="date" placeholder="选择开始时间" style="width: 100%"></DatePicker>
                            </i-col>
                            <i-col :xs="6">
                                <DatePicker :transfer="true" placement="left" v-model="el2.special_price_end_at" type="date"  placeholder="选择结束时间" style="width: 100%"></DatePicker>
                            </i-col>
                        </Row>
                    </TabPane>
                </Tabs>
            </FormItem>                  
                                           
            <FormItem label="项目主图" class="col-sm-6">
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
                        <img :src="service.filePath" alt="" style="width: 150px;height:100px">
                    </div>                    
                </Upload>
            </FormItem> 
            <FormItem label="项目介绍" class="col-sm-12">
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
        <Table border :columns="service.columns" :loading="loading" :data="service.data"></Table>
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
    name: 'ServiceItemsFwxm',
    data (){
        return {
            loading: false,
            keywords: '',
            types: {
                modal_add_state: false,
                modalTitle: '添加服务类型',
                typeList: [],
                formDynamic: {
                    items: [
                        {
                            name: '',
                            store_id: 0,
                            type_code: 'service'
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
                advanced_price: [],
                formValidate: {
                    type_code: 'service',
                    name: '',
                    sku: '',
                    category_ids: '',
                    images: '',
                    price: '',
                    special_price: '',
                    special_price_start_at: '',
                    special_price_end_at: '',
                    department_id: '',
                    description: '',
                    advanced_price: []
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
                    key: 'sku',
                    sortable: true,
                    sortType: 'asc'
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
                    width: 250,
                    render(h,p){
                        let el = [
                            h('Button',{
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                on: {
                                    click(e){
                                        _this.service.modal_add_state = true;
                                        _this.service.modalTitle = "编辑服务项目";   
                                        util.clone(_this.service.formValidate,p.row);
                                        _this.service.formValidate.id = p.row.id;
                                        _this.service.formValidate.images = p.row.image_path;
                                        _this.service.filePath = p.row.image_url;
                                        _this.service.formValidate.category_ids = p.row.category_ids[0];
                                        _this.priceInit(p.row.advanced_prices);
                                        tinymce.get(_this.editId).setContent(_this.service.formValidate.description);
                                    }
                                }
                            },'编辑'),
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },   
                                style: {
                                    margin: '0 15px'
                                },                             
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
                                h('Button',{
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },                                    
                                    on: {
                                        click(e){
                                            if(p.row.status == 1){
                                                _this.$Modal.confirm({
                                                    title: '系统提示',
                                                    content: '<h4 class="text-warning text-center">确认下架？</h4>',
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
                        }else{
                            el.push(
                                h('Button',{
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },                                    
                                    on: {
                                        click(e){
                                            if(p.row.status == 0){
                                                _this.$Modal.confirm({
                                                    title: '系统提示',
                                                    content: '<h4 class="text-warning text-center">确认上架？</h4>',
                                                    onOk: ()=>{
                                                        _this.$http.post("/boss/product/update",{id: p.row.id,status: 1}).then(res=>{
                                                            _this.$Message.success(res.message);
                                                            _this.getServiceList();
                                                        })
                                                    }
                                                });                                        
                                            }
                                        }
                                    }
                                },'上架')                                
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
        staffTypeList () {
            return this.$store.state.story.staffTypeList;
        },
        editId () {
            return 'editor'+date;
        }                    
    },
    watch: {
        store_id () {
            this.types.formDynamic.items.map(e=>{
                e.store_id = this.store_id;
            })
            this.getServiceList();
            this.getTypeList();            
        },
        departList () {
            this.service.departmentList = this.departList;
        }
    },
    methods: {
        priceInit (list=[]) {
            let format = (data,type = true)=>{
                let arr = [];
                data.forEach(e=>{
                    let hasObj = list.filter(item=>{
                        return item.job_title_id === e.id;
                    });
                    let obj = {};
                    obj.job_title_id = e.id;
                    obj.$type = hasObj.length&&type ? 'tysz' : 'ddsz';
                    obj.$name = e.name;
                    obj.price = "";
                    obj.special_price = "";
                    obj.special_price_start_at = "";
                    obj.special_price_end_at = "";
                    if(hasObj.length){
                        obj.price = hasObj[0].price;
                        obj.special_price = hasObj[0].special_price;
                        obj.special_price_start_at = hasObj[0].special_price_start_at;
                        obj.special_price_end_at = hasObj[0].special_price_end_at;
                        obj.id = hasObj[0].id;
                    }
                    obj.children = format(e.children,false);
                    arr.push(obj);
                })                
                return arr;
            }
            this.service.advanced_price = format(this.staffTypeList);
        },
        spsChange (v) {
            this.service.formValidate.special_price_start_at = v;
        },
        speChange (v) {
            this.service.formValidate.special_price_end_at = v;
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
                            type_code: 'service'
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
                    let params = this.service.formValidate;
                    let format = (o)=>{
                        if(o instanceof Date){
                            return o.Format('yyyy-MM-dd');
                        }
                        return o;
                    }
                    this.service.advanced_price.forEach(e=>{
                        if(e.$type==='tysz'){
                            let obj = {};
                            obj.job_title_id = e.job_title_id;
                            obj.price = e.price;
                            obj.special_price = e.special_price;
                            obj.special_price_start_at = format(e.special_price_start_at);
                            obj.special_price_end_at = format(e.special_price_end_at);
                            params.advanced_price.push(obj);
                        }else{
                            e.children.forEach(e2=>{
                                let obj = {};
                                obj.job_title_id = e2.job_title_id;
                                obj.price = e2.price;
                                obj.special_price = e2.special_price;
                                obj.special_price_start_at = format(e2.special_price_start_at);
                                obj.special_price_end_at = format(e2.special_price_end_at);
                                params.advanced_price.push(obj);
                            })
                        }
                    })
                    params.store_id = this.store_id;
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
                type_code: 'service'
            });
        },
        addTypeModal (){
            this.types.modal_add_state = true;
        },
        addServiceModal (){
            this.service.modal_add_state = true;
            this.service.modalTitle = "添加服务项目";
            if(this.service.formValidate.id){
                delete this.service.formValidate.id;
                this.service.filePath = "";
                this.$refs['addServiceForm'].resetFields();
            }
            this.priceInit();
        },
        getTypeList (){
            if(this.store_id){
                this.$http.get("/boss/category/list",{params: {type_code: 'service',store_id: this.store_id}}).then((res)=>{
                    this.types.typeList = res.data;
                });
            }
        },
        getServiceList (){
            if(this.store_id){
                let params = {
                    store_id: this.store_id,
                    page: this.service.page,
                    page_size: this.service.page_size
                };
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
        this.types.formDynamic.items.map(e=>{
            e.store_id = this.store_id;
        })
        this.getServiceList();
        this.getTypeList();           
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
