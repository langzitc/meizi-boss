<template>
  <div>
    <Card>
      <Row slot="title">
        <i-col class="text-left" :xs="12">
          <Select v-model="store_id"  @on-change="storeChange" style="width: 200px; display:none">
            <Option :value="0">选择门店</Option>
            <Option v-for="item in storeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>          
        </i-col>
        <i-col class="text-right">
            <Button type="info" icon="android-add" @click="addDepModal">添加部门</Button>
            <Modal
              v-model="modal_add_state"
              ok-text="保存"
              @on-ok="handleAdd"
              @on-cancel="handleCancel"
              :mask-closable="false"
              :title="modalTitle">
              <Form style="width: 80%;margin: 20px auto" ref="addDepartmentForm">
                <FormItem label="门店" style="display: none">
                  <Select  v-model="store_id"  @on-change="storeChange">
                    <Option :value="0">选择门店</Option>
                    <Option v-for="item in storeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                  <p class="text-warning" v-show="!store_id">*门店必须选择</p>
                </FormItem>
                <FormItem label="部门名称">
                  <Input type="text" placeholder="请输入..." v-model="add_depart_name"></Input>
                  <p class="text-warning" v-show="!add_depart_name">*中文或英文</p>
                </FormItem>
              </Form>
            </Modal>          
            <Input icon="ios-search" v-model="keywords" @on-change="getDepartList" placeholder="输入关键字..." style="width: 200px"></Input>
        </i-col>
      </Row>
      <div v-if="store_id">
        <Table border :columns="columns" :loading="loading" :data="data"></Table>
      </div>
      <div class="text-center" v-if="!store_id">
        <Alert type="warning">
          <h5>未选择门店</h5>
        </Alert>
      </div>      
    </Card>
  </div>
</template>
<script>
    let _this = null;
    export default {
        name: 'AddDepartment',
        data() {
            return {
              store_id: 0,
              keywords:"",
              modal_add_state: false,
              add_depart_name: '',
              departmentId: '',
              modalTitle: '添加部门',
              addTypes: 'ADD_STORE_DEPARTMENT',
              columns: [
                {
                  title: '部门ID',
                  key: 'id'
                },
                {
                  title: '部门名称',
                  key: 'name'
                },
                {
                  title: '操作',
                  className: 'mzmy-table-oper',
                  align: 'right',
                  width: 200,
                  render(h,p){
                    return h('div',[
                      h('Button',{
                        props: {
                          size: 'small',
                          type: 'info'
                        },
                        on: {
                          click(e){
                            _this.modalTitle = '编辑部门';
                            _this.departmentId = p.row.id;
                            _this.store_id = p.row.store_id;
                            _this.add_depart_name = p.row.name;
                            _this.modal_add_state = true;
                            _this.addTypes = 'UPDATE_STORE_DEPARTMENT';
                          }
                        }
                      },'编辑'),
                      h('Button',{
                        props: {
                          size: 'small',
                          type: 'primary'
                        },
                        style: {
                          marginLeft: '5px'
                        },
                        on: {
                          click(e){
                            _this.delDepartment(p.row.id);
                          }
                        }
                      },'删除')
                    ]);
                  }
                }
              ],
              data: []
            }
        },
        methods: {
          storeChange (value){
            this.getDepartList(value);
            sessionStorage.setItem(this.$store.getters+"mzmy_add_department_sid",value);
          },
          getDepartList (value = this.store_id){
            let params = value ? {store_id: value} : {};
            if(this.keywords != "") {
                params["name"] = this.keywords;
                params["store_id"] = this.store_id;
            } else {
                params["store_id"] = this.store_id;
            }
            this.$store.dispatch("GET_DEPARTMENT_LIST",params).then((data)=>{
              this.data = data;
            })
          },
          addDepModal (){
            this.modal_add_state = true;
            this.modalTitle='添加部门';
            this.add_depart_name='';
            this.addTypes = 'ADD_STORE_DEPARTMENT';
          },
          handleAdd (){
            if(this.add_depart_name&&this.store_id){
              let param = {
                store_id: this.store_id,
                name: this.add_depart_name
              };
              if(this.addTypes === 'UPDATE_STORE_DEPARTMENT'){
                param.id = this.departmentId;
              }
              this.$store.dispatch(this.addTypes,param).then((msg)=>{
                this.$Message.success(msg);
                this.getDepartList();
                this.$refs['addDepartmentForm'].resetFields();
              }).catch((e)=>{
                this.$Message.error(e);
              });
            }
          },
          handleCancel(){
            this.$refs['addDepartmentForm'].resetFields();
          },
          delDepartment(id){
            this.$Modal.confirm({
              title: '系统提示',
              content: '<h4 class="text-warning text-center">确认删除？</h4>',
              onOk: ()=>{
                this.$store.dispatch("DELETE_STORE_DEPARTMENT",{id}).then((msg)=>{
                  this.getDepartList();
                  this.$Message.success(msg);
                }).catch((e)=>{
                  this.$Message.error(e);
                });
              }
            });
          }
        },
        computed: {
          storeList (){
            return this.$store.state.story.storeList;
          },
          stores () {
            return this.$store.state.story.store_id;
          },
          loading () {
            return this.$store.state.user.request !== 0;
          }
        },
        watch: {
          stores (n,o) {
            if(n){
              this.store_id = n;
            }
          }
        },
        mounted (){
          _this = this;
          if(this.stores){
            this.store_id = this.stores;
          }
        }
    }
</script>
<style type='less' scoped>
</style>
