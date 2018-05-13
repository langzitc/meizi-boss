<template>
  <div>
    <Card>
      <Row>
        <i-col :sm="12" class="text-left">
          <select-store style="width:200px"></select-store>
          <Select v-model="status"  @on-change="getStaffList" style="width: 100px" clearable placeholder="员工状态">
            <Option :value="1">在职</Option>
            <Option :value="0">离职</Option>
          </Select>
          <Select v-model="depart_id"  @on-change="getStaffList" style="width: 100px" clearable placeholder="选择部门">
            <Option v-for="item in departList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>          
        </i-col>
        <i-col :sm="12" class="text-right">
          <Button icon="android-add" @click="showAddStaffModal" v-if="store_id" type="info">新增员工</Button>
          <Button icon="close-round" :disabled="selectRows === 0" type="primary" @click="dels">删除</Button>          
        </i-col>
      </Row>
    </Card>
    <Card v-if="store_id">
      <div slot="title" style="display:flex;justify-content:flex-end">
        <Input v-model="keywords" placeholder="输入关键字..." style="width: 200px">
        <Button slot="append" icon="ios-search" @click="getStaffList"></Button>
        </Input>
      </div>
      <div>
        <Table @on-selection-change="slectChange" border :columns="columns" :loading="loading" :data="data"></Table>
      </div>
    </Card>
    <Card v-if="!store_id">
      <div class="text-center">
        <Alert type="warning">
          <h5>未选择门店</h5>
        </Alert>
      </div>
    </Card>
    <Modal
      v-model="showAddStaff"
      class-name="modal-scroll"
      :title="addStaffModalTitle"
      width="750"
      :mask-closable="false"
      :loading="showAddStaff">
      <div slot="footer">
          <Button type="ghost" @click="handCancel">取消</Button>
          <Button type="primary" @click="handSubmit">保存</Button>
      </div>
      <Alert type="warning" class="text-center">
        <Icon type="android-warning"></Icon>系统提示：手机号为员工登录账号
      </Alert>
      <Form ref="addStaffForm" :model="formValidate" :rules="ruleValidate" :label-width="80" class="clearfix">
        <FormItem label="姓名" prop="name" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.name" placeholder="真实姓名"></Input>
        </FormItem>
        <FormItem label="性别" prop="gender" class="col-sm-12 col-md-6">
            <RadioGroup v-model="formValidate.gender">
              <Radio v-for="el in genderList" :key="el.value" :label="el.value">{{el.label}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="职称" prop="job_title_id" class="col-sm-12 col-md-6">
          <Select v-model="formValidate.job_title_id" placeholder="选择职称">
            <span v-for="el in currentStaffTypeList" :key="el.id">
                <Option disabled :value="el.id"><span style="color: #000">{{el.name}}</span></Option>
                <Option :value="el2.id" :key="el2.id" v-if="el.children&&el.children.length" v-for="el2 in el.children">
                    <span style="margin-left: 10px">{{el2.name}}</span>
                </Option>
            </span>            
          </Select>
        </FormItem>
        <FormItem label="部门" prop="department_id" class="col-sm-12 col-md-6">
          <Select v-model="formValidate.department_id" placeholder="选择部门">
            <Option v-for="item in departList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>             
        </FormItem>
        <FormItem label="手机号码" prop="mobile" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.mobile" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="身份证号" prop="id_number" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.id_number" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="入职时间" prop="hiredate"  class="col-sm-12 col-md-6">        
          <DatePicker :transfer="true" :value="formValidate.hiredate" style="width:100%" type="date" placeholder="选择日期" @on-change="dateChange"></DatePicker>         
        </FormItem>
        <FormItem label="工作年限" prop="work_seniority" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.work_seniority" placeholder="请输入..."></Input>
        </FormItem>           
        <FormItem label="员工编号" prop="employee_number" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.employee_number" placeholder="请输入..."></Input>
        </FormItem>        
        <FormItem label="登录密码" prop="password" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.password" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="银行卡号" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.bank_number" placeholder="请输入..."></Input>
        </FormItem>        
        <FormItem label="备注" class="col-sm-12 col-md-6">
          <Input v-model="formValidate.comment" placeholder="请输入..."></Input>
        </FormItem>

          <FormItem label="介绍" class="col-sm-12 col-md-12">
              <Input v-model="formValidate.description" type="textarea" :rows="6" placeholder="请输入..."></Input>
          </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import SelectStore from '../store_select'
  import util from '../../../util'
  import { skuValidate } from '../../../util/validate'
  let _this = null;
  export default {
    name: 'yggl-ygzl',
    data() {
      return {
        selectRows: 0,
        formValidate: {
          name: '',
          mobile: '',
          store_id: '',
           status:1,
          gender: '1',
          job_title_id: "",
          department_id: '',
          id_number: '',
          employee_number: '',
          bank_number: '',
          hiredate: (new Date()).Format('yyyy-MM-dd'),
          password: '',
            description: '',
            comment:'',
          work_seniority: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机不能为空', trigger: 'blur' }
          ],
          department_id: [
            { required: true, message: '部门不能为空', trigger: 'change' }
          ],
          id_number: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          employee_number: [
            { required: true, message: '员工编号不能为空', trigger: 'blur' },
            { validator: skuValidate, trigger: 'blur' }
          ],
          hiredate: [
            { required: true, message: '入职时间不能为空', trigger: 'change' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          job_title_id : [
            { required: true, message: '职称不能为空', trigger: 'change' }
          ],
          work_seniority : [
            { required: true, message: '工作年限不能为空', trigger: 'blur' }
          ]                                                                                                               
        },
        loading: false,
        is_deleted: 0,
          status:1,
        depart_id: '',
        keywords: '',
        showAddStaff: false,
        addStaffModalTitle: '添加员工',
        columns: [
          {
            title: '编号',
            key: 'employee_number'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            render(h,p){
              let g = "";
              _this.genderList.map(e=>{
                if(e.value == p.row.gender){
                  g = e.label;
                  return;
                }
              })
              return g;
            }
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '级别',
            key: 'job_title_name'
          },
          {
            title: '入职时间',
            key: 'hiredate'
          },
          {
            title: '工作年限',
            key: 'work_seniority'
          },          
          {
            title: '状态',
            render(h,p){
              if(p.row.status == 1){
                return '在职';
              }else{
                return '离职';
              }
            }
          },
          {
            title: '部门',
            render(h,p){
              let g = "";
              _this.departList.map(e=>{
                if(e.id == p.row.department_id){
                  g = e.name;
                }
              })
              return g;
            }
          },
          {
            title: '操作',
            className: 'mzmy-table-oper',
            width: 250,
            align: 'right',
            render(h,p){
                let arr = [
                    h('Button',{
                        props: {
                          type: 'info',
                          size: 'small'
                        },
                        on: {
                            click(e){
                                _this.showAddStaff = true;
                                _this.addStaffModalTitle = '编辑员工';
                                util.clone(_this.formValidate,p.row);
                                _this.formValidate.id = p.row.id;
                            }
                        }
                    },'编辑')
                    /*
                    ,
                    h('Button',{
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginLeft: '5px'
                        },                      
                        on: {
                            click(e){
                                _this.del(p.row.id);
                            }
                        }
                    },'删除')       */
                ];
                if(p.row.status == 1){
                    arr.push(
                      h('Button',{
                          props: {
                            type: 'warning',
                            size: 'small'
                          },
                          style: {
                            marginLeft: '5px'
                          },                         
                          on: {
                              click(e){
                                _this.$Modal.confirm({
                                  title: '系统提示',
                                  content: '<h4 class="text-warning text-center">确认设为离职？</h4>',
                                  onOk: ()=>{
                                      _this.$http.post("/boss/employee/setStatus",{id: p.row.id,status: 0}).then((res)=>{
                                          _this.getStaffList();
                                          _this.$Message.success(res.message);  
                                      })
                                  }
                                });
                              }
                          }
                      },'设为离职')                      
                    )                  
                }else{
                    arr.push(
                      h('Button',{
                          props: {
                            type: 'success',
                            size: 'small'
                          },
                          style: {
                            marginLeft: '5px'
                          },                         
                          on: {
                              click(e){
                                _this.$Modal.confirm({
                                  title: '系统提示',
                                  content: '<h4 class="text-warning text-center">确认设为在职？</h4>',
                                  onOk: ()=>{
                                      _this.$http.post("/boss/employee/setStatus",{id: p.row.id,status: 1}).then((res)=>{
                                          _this.getStaffList();
                                          _this.$Message.success(res.message);  
                                      })
                                  }
                                });
                              }
                          }
                      },'设为在职')                      
                    )                     
                }
                return h('div',arr);                            
            }
          }
        ],
        data: []
      }
    },
    computed: {
        storeList (){
            return this.$store.state.story.storeList;
        },
        departList (){
            return this.$store.state.story.departList;
        },
        store_id (){
          return this.$store.state.story.store_id;
        },
        genderList (){
          return this.$store.state.user.genderList;
        },
        currentStaffTypeList () {
          return this.$store.state.story.staffTypeList;
        }
    },
    watch: {
      showAddStaff (n,o) {
        if(!n){
          this.$refs.addStaffForm.resetFields();
        }
      },
      store_id () {
        this.getStaffList();
        this.$store.dispatch("GET_DEPARTMENT_LIST",{store_id: this.store_id});  
      },
      keywords() {
          this.getStaffList();
      }
    },
    methods: {
        showAddStaffModal (){
          this.showAddStaff = true;
          this.addStaffModalTitle = "添加员工";
          if(this.formValidate.id){
            delete this.formValidate.id;
          }
        },
        getStaffList(){
          let params = {};
          if(this.store_id){
            params.store_id = this.store_id;
            if(this.depart_id){
              params.department_id = this.depart_id;
            }
          }
          params.is_deleted = 0;
          params.status = this.status;

          if(this.keywords){
            params.keywords = this.keywords;
          }
          this.loading = true;
          this.$http.get("/boss/employee/list",{params}).then((res)=>{
            this.data = res.data.items;
            this.loading = false;
          }).catch((e)=>{
            reject(e);
          })
        },
        dateChange (v){
          this.formValidate.hiredate = v;
        },
        handSubmit (){
            let types = this.formValidate.id ? 'EMPLOYEE_UPDATE' : 'EMPLOYEE_ADD';
            this.$refs.addStaffForm.validate((valid)=>{
              if(valid){
                this.formValidate.store_id = this.store_id;
                this.$store.dispatch(types,this.formValidate).then((msg)=>{
                    this.$Message.success(msg);
                    this.getStaffList();
                    this.showAddStaff = false;
                })
              }else{
                this.$Message.error("表单填写错误");
              }
            })
        },
        handCancel (){
            this.showAddStaff = false;
        },
        storeChange (){
            this.$store.dispatch("GET_DEPARTMENT_LIST",{store_id: this.store_id});
            this.getStaffList();
        },
        slectChange (selection) {
            this.selectRows = selection;
        },
        del (id) {
            this.$Modal.confirm({
                title: '系统提示',
                content: '<h4 class="text-warning text-center">确认删除？</h4>',
                onOk: ()=>{
                    this.$http.post("/boss/employee/delete",{id}).then((res)=>{
                        this.getStaffList();
                        this.$Message.success(res.message);  
                    })
                }
            });              
        },
        dels () {
            this.del(this.selectRows.map(e=>{return e.id}).join(','));
        }
    },
    mounted(){
        _this = this;
        if(this.store_id){
          this.getStaffList();
          this.$store.dispatch("GET_DEPARTMENT_LIST",{store_id: this.store_id});                     
        }
        this.$store.dispatch("GET_STAFF_TYPE_LIST",{
            store_id: 0
        });          
    },
    components: {
        SelectStore
    }
  }
</script>
<style type='less' scoped>
</style>
