<template>
    <div class="demo-tabs-style2">
      <Card>
        <Tabs>
          <TabPane label="权限组">
            <Card class="clearfix">
              <div slot="title" class="text-right">
                  <Button type="info" @click="addManagerRoleGroup">增加权限组</Button>
                  <Button type="primary" :disabled="selectGrupRows.length===0" @click="dels(true)">删除</Button>
                  <Modal
                    v-model="groups.addManagerRoleGroupState"
                    :loading="groups.addManagerRoleGroupState"
                    :mask-closable="false"
                    width="700"
                    class-name="modal-scroll"
                    :title="groups.modalTitle">
                    <div slot="footer">
                    <Button type="text" size="large" @click="cancelManagerRoleGroup">取消</Button>
                    <Button type="primary" size="large" @click="handManagerRoleGroup">保存</Button>
                    </div>
                    <AddManagerRoleGroup :selectMenu="groups.selectMenu" :gid="getGid" :formValidates="groups.formValidate" ref="addManagerRoleGroup"></AddManagerRoleGroup> 
                  </Modal>
              </div>
              <div>
                <Table @on-selection-change="gtableSelect" :columns="groups.column" :loading="loading" :data="groups.data"></Table>                 
              </div>        
            </Card>
          </TabPane>
          <TabPane label="管理员列表">
            <Card class="clearfix">
              <div slot="title">
                  <Row>
                      <i-col :sm="12" class="text-left">
                          <Select style="width: 150px" v-model="manager.groupState" @on-change="getManagerList">
                              <Option value="">全部权限组</Option>
                              <Option v-for="el in groups.data" :key="el.id" :value="el.id">{{el.name}}</Option>
                          </Select>
                          <Select style="width: 150px" v-model="manager.managerState" @on-change="getManagerList">
                              <Option value="">全部状态</Option>
                              <Option :value="0">冻结</Option>
                              <Option :value="1">正常</Option>
                          </Select>                          
                      </i-col>
                      <i-col :sm="12" class="text-right">
                            <AddAdministrator ref="addAdministrator" :roleList="groups.data" @afterSave="afterSave" @on-change="getManagerList">
                                <Button type="primary">增加管理员</Button> 
                            </AddAdministrator>     
                            <Button type="primary" :disabled="selectManagerRows.length===0" @click="dels(false)">删除</Button>                                               
                      </i-col>
                  </Row>
              </div>
              <div>
                <Table @on-selection-change="mtableSelect" :columns="manager.column" :loading="loading" :data="manager.data"></Table>                 
              </div>        
            </Card>
          </TabPane>
        </Tabs>
      </Card>

    </div>
</template>
<script>
    import AddManagerRoleGroup from './addManagerRoleGroup'
    import AddAdministrator from './addAdministrator'

    let _this = null;
    export default {
        name: 'Administrator',
        data() {
            return {
                loading: false,
                selectGrupRows: [],
                selectManagerRows: [],
                manager: {
                    data: [],
                    row: {},
                    column: [{
                        type: 'selection',
                        width: 80
                    },{
                        title: '编号',
                        key: 'id'
                    },{
                        title: '管理员账号',
                        key: 'phone'
                    },{
                        title: '姓名',
                        key: 'name'
                    },{
                        title: '联系方式',
                        key: 'phone'
                    },{
                        title: '权限组',
                        key: 'role_id',
                        render(h,p){
                            let roleName = "";
                            _this.groups.data.map((e)=>{
                                if(e.id == p.row.role_id){
                                    roleName = e.name;
                                }
                            })
                            return h("span",roleName);
                        }
                    },{
                        title: '状态',
                        key: 'status',
                        render (h,p){
                            return h("span",p.row.status == 1 ? '正常' : '冻结');
                        }
                    },{
                        title: '操作',
                        className: 'mzmy-table-oper',
                        align: 'right',
                        width: 200,
                        render(h,p){
                            let actions = [];
                            if(p.row.status == 1) {
                                actions.push(
                                    h(AddAdministrator,{
                                        on: {
                                            'on-change'(){
                                                _this.getManagerList();
                                            },
                                            afterSave: function(){
                                                _this.getManagerList();
                                            }
                                        },
                                        props: {
                                            id: parseInt(p.row.id),
                                            roleList: _this.groups.data,
                                        }
                                    }));
                            }
                            actions.push(
                                h('Button',{
                                    style: {
                                        marginLeft: '5px'
                                    },
                                    props: {
                                        type: p.row.status == 0 ? 'success' : "primary",
                                        size: 'small'
                                    },
                                    on: {
                                        click(e){
                                            if(p.row.status == 0) {
                                                _this.changeManagerStatus(p.row.id, 1)
                                            } else {
                                                // _this.delManager(p.row.id);
                                                _this.changeManagerStatus(p.row.id, 0)
                                            }

                                        }
                                    }
                                }, p.row.status == 1 ? "冻结" :'解冻')
                            );
                            if(p.row.status == 0) {
                                actions.push(h('Button',{
                                    style: {
                                        marginLeft: '5px'
                                    },
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        class: "yellower"
                                    },
                                    on: {
                                        click(e){
                                            _this.delManager(p.row.id);
                                        }
                                    }
                                }, "删除"));
                            }
                            return h('div',actions);
                        }                        
                    }],
                    groupState: '',
                    managerState: ''
                },
                groups: {
                    modalTitle: '',
                    addManagerRoleGroupState: false,
                    selectMenu: [],
                    gid: 0,
                    data: [],
                    formValidate: {
                        name: '',
                        description: '',
                        initEdit: true
                    },
                    column: [{
                        type: 'selection',
                        width: 80
                    },{
                        title: '编号',
                        key: 'id'
                    },{
                        title: '权限组名称',
                        key: 'name'
                    },{
                        title: '描述',
                        key: 'description'
                    },{
                        title: '操作',
                        className: 'mzmy-table-oper',
                        align: 'right',
                        width: 200,
                        render(h,p){
                            return h('div',[
                            h('Button',{
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                on: {
                                    click(e){
                                        _this.groups.modalTitle = '编辑权限组';
                                        _this.groups.addManagerRoleGroupState = true;
                                        _this.groups.selectMenu = JSON.parse(p.row.menus);
                                        _this.groups.gid = p.row.id;
                                        _this.groups.formValidate = {
                                            name: p.row.name,
                                            description: p.row.description,
                                            initEdit: true
                                        }
                                        console.log(_this.groups.formValidate)
                                    }
                                }
                            },'编辑'),
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
                                        _this.delManagerGroupRole(p.row.id);
                                    }
                                }
                            },'删除')
                            ]);                            
                        }
                    }]
                }               
            }
        },
        methods: {
            changeManagerStatus(id,status) {
                this.$http.post("/boss/storeManager/update",{id,status}).then((res)=>{
                    this.$Message.success(res.message);
                    this.getManagerList();
                })
            },
            /**
             * 获取权限组
             */
            getOperGroup (){
                this.loading = true;
                this.$http.get("/boss/storeManagerRole/list").then((res)=>{
                    this.groups.data = res.data.items;
                    this.loading = false;
                });
            },
            afterSave() {
                this.getManagerList();
            },
            /**
             * 获取管理员列表
             */
            getManagerList (){
                let params = {};
                if(this.manager.groupState){
                    params.group_ids = this.manager.groupState;
                }
                if(this.manager.managerState+"" != ""){
                    params.status = this.manager.managerState;
                }
                this.loading = true;
                this.$http.get("/boss/storeManager/list",{params}).then((res)=>{
                    this.manager.data = res.data;
                    this.loading = false;
                });
            },
            addManagerRoleGroup (){
                this.groups.modalTitle = '增加权限组';
                this.groups.addManagerRoleGroupState = true;
                this.groups.selectMenu = [];
                this.groups.gid = '';
                this.groups.formValidate = {
                    name:'',
                    description: ''
                }
            },
            /**
             *  保存权限组
             */
            handManagerRoleGroup (){
                this.$refs['addManagerRoleGroup'].handSubmit().then(()=>{
                    this.getOperGroup();
                    this.groups.addManagerRoleGroupState = false;
                })
            },
            /**
             * 取消保存
             */
            cancelManagerRoleGroup (){
                this.$refs['addManagerRoleGroup'].handCancel();
                this.groups.addManagerRoleGroupState = false;
            },
            /**
             * 
             */
            delManagerGroupRole (id){
                this.$Modal.confirm({
                title: '系统提示',
                content: '<h4 class="text-warning text-center">确认删除？</h4>',
                onOk: ()=>{
                    this.$http.post("/boss/storeManagerRole/delete",{id}).then((res)=>{
                        this.getOperGroup();
                        this.$Message.success(res.message);  
                    })
                }
                });                
            },
            dels (type) {
                if(type){
                    this.delManagerGroupRole(this.selectGrupRows.map(e=>{
                        return e.id;
                    }).join(','));
                }else{
                    this.delManager(this.selectManagerRows.map(e=>{
                        return e.id;
                    }).join(','));                    
                }
            },
            /**
             * 删除管理员
             */
            delManager (id){
                this.$Modal.confirm({
                title: '系统提示',
                content: '<h4 class="text-warning text-center">确认删除？</h4>',
                onOk: ()=>{
                    this.$http.post("/boss/storeManager/delete",{id}).then((res)=>{
                        this.getManagerList();
                        this.$Message.success(res.message);                            
                    })
                }
                });                   
            },
            gtableSelect (selection){
                this.selectGrupRows = selection;
            },
            mtableSelect (selection){
                this.selectManagerRows = selection;
            }            
        },
        computed: {
            getGid(){
                return parseInt(this.groups.gid);
            }
        },
        mounted (){
            _this = this;
            this.getManagerList();
            this.getOperGroup();
        },
        components: {
            AddManagerRoleGroup,
            AddAdministrator
        }
    }
</script>
<style type='less' scoped>
</style>
