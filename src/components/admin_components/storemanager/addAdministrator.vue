<template>
    <span @click="modalState = true">
        <slot>
            <Button type="info" size="small">编辑</Button>
        </slot>
        <Modal
            v-model="modalState"
            class-name="modal-scroll"
            :loading="modalState"
            :title="modalTitle">
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="sub">保存</Button>
            </div>       
                <Alert type="warning" class="text-center">
                    <Icon type="android-warning"></Icon>系统提示：手机号为登录账号
                </Alert>                                     
                <Form ref="addManagerForm" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="手机号" prop="phone">
                        <Input type="text" v-model="formValidate.phone" style="width: 300px" placeholder="请输入"></Input>
                    </FormItem>                
                    <FormItem label="登录密码" prop="password">
                        <Input type="password" v-model="formValidate.password" style="width: 300px" placeholder="请输入"></Input>
                    </FormItem>                       
                    <FormItem label="管理员姓名" prop="name">
                        <Input type="text" v-model="formValidate.name" style="width: 300px" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="门店管理类型" prop="name">
                        <RadioGroup v-model="formValidate.permission_by" @on-change="typeChange">
                            <Radio label="0">分组授权</Radio>
                            <Radio label="1">门店授权</Radio>
                        </RadioGroup>
                    </FormItem>                    
                    <FormItem v-if="formValidate.permission_by == 0" label="选择分组" prop="store_group_ids">
                            <Select multiple :transfer="true" style="width: 300px" v-model="formValidate.store_group_ids" clearable placeholder="选择管理门店分组">
                                <Option v-for="el in storeGroupList" :key="el.id" :value="el.id">{{el.name}}</Option>
                            </Select>  
                    </FormItem>
                    <FormItem v-if="formValidate.permission_by == 1" label="选择门店" prop="store_ids">
                            <Select multiple :transfer="true" style="width: 300px" v-model="formValidate.store_ids" clearable placeholder="选择管理门店">
                                <Option v-for="el in storeList" :key="el.id" :value="el.id">{{el.name}}</Option>
                            </Select>  
                    </FormItem>                    
                    <FormItem label="权限组" prop="role_id">
                            <Select :transfer="true" style="width: 300px" v-model="formValidate.role_id" placeholder="请选择">
                                <Option v-for="el in roleList" :key="el.id" :value="el.id">{{el.name}}</Option>
                            </Select>              
                    </FormItem>                                                                   
                </Form>  
                <div class="part-loading" v-show="loading">
                    <Spin fix>
                        <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                        <div>加载中</div>
                    </Spin>			
                </div>                 
        </Modal>         
    </span>
</template>
<script>
    import { mapState } from 'vuex'
    import { selectValidate, telValidate } from '../../../util/validate'
    export default {
        name: 'AddAdministrator',
        data (){
            return {
                modalState: false,
                loading: false,
                formValidate: {
                    name: '',
                    phone: '',
                    role_id: '',
                    store_group_ids: [],
                    password: '',
                    permission_by: '0',
                    store_ids: []
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '手机不能为空', trigger: 'blur' },
                        { validator: telValidate,trigger: 'blur',message: '手机号格式错误'}
                    ],
                    role_id: [
                        { required: true, message: '权限组不能为空', trigger: 'blur' }
                    ],
                    store_group_ids: [
                        { validator: selectValidate,message: '请选择管理分组', trigger: 'change' }
                    ],
                    store_ids: [
                        { validator: selectValidate, message: '请选择管理门店', trigger: 'change' }
                    ],                    
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]                                                                                                    
                }
            }
        },
        computed: {
            modalTitle () {
                return this.id ? '编辑管理员' : '添加管理员';
            },
            ...mapState({
                storeGroupList: state => state.story.storeGroupList,
                storeList: state => state.story.storeList
            })
        },
        props: {
            id: {
                type: Number
            },
            roleList: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        watch: {
            modalState (n) {
                if(n){
                    if(this.id){
                        this.getInfo();
                    }
                }else{
                    this.$refs['addManagerForm'].resetFields();
                }
            }
        },
        methods: {
            typeChange (v) {
                switch(parseInt(v)){
                    case 0: 
                        this.formValidate.store_group_ids = [];
                    break;
                    case 1: 
                        this.formValidate.store_ids = [];
                    break;
                }
            },
            sub (){
                let path = "/boss/storeManager/create";
                let params = JSON.parse(JSON.stringify(this.formValidate));
                if(this.id){
                    path = "/boss/storeManager/update";
                }
                return new Promise((resolve,reject)=>{
                    this.$refs['addManagerForm'].validate((valid)=>{
                        if(valid){
                            this.$http.post(path,params).then((res)=>{
                                this.$emit("afterSave",{});
                                this.$Message.success(res.message);
                                this.modalState = false;
                                resolve();
                            }).catch(e=>{
                                reject(e);
                            });
                        }else{
                            this.$Message.error("表单验证失败");
                        }
                    })                
                });

            },
            cancel (){
                this.modalState = false;
            },
            getInfo () {
                this.loading = true;
                this.$http.get('/boss/storeManager/info',{params: {id: this.id}}).then(res=>{
                    Object.assign(this.formValidate,res.data);
                    this.formValidate.password = "**********";
                    if(res.data.groups&&Array.isArray(res.data.groups)){
                        this.formValidate.store_group_ids = res.data.groups.map(e=>{
                            return e.group_id;
                        });                        
                    }
                    if(res.data.stores&&Array.isArray(res.data.stores)){
                        this.formValidate.store_ids = res.data.stores.map(e=>{
                            return e.store_id;
                        });                        
                    }                    
                    this.loading = false;
                })
            }        
        },
        mounted (){
            this.$store.dispatch("GET_STORE_GROUP");
        }        
    }
</script>
<style>
</style>