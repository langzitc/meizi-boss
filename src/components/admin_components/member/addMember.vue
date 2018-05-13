<template>
  <span @click="modalState = true" style="cursor: pointer">
      <slot>
          <Button type="success" icon="android-add">添加会员</Button>
      </slot>
      <Modal
        v-model="modalState"
        :loading="modalState"
        :title="title"
        :mask-closable="false"
        class-name="modal-scroll"
        :width="750"
      >
        <div slot="footer">
            <Button type="text" @click="handleCancel">取消</Button>
            <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button>
        </div>
        <Tabs>
            <TabPane label="基本信息">
                <Card>
                    <p slot="title">会员资料</p>
                    <Form class="clearfix" :label-width="100" ref="addMemberForm" :model="formItem" :rules="rules">
                        <FormItem label="选择门店" class="col-sm-6">
                            <select-store style="width:205px" @store-change="storeChange"></select-store> 
                        </FormItem>
                        <FormItem label="会员编号" class="col-sm-6" prop="number">
                            <Input type="text" placeholder="请输入" v-model="formItem.number"></Input>
                        </FormItem> 
                        <FormItem label="会员姓名" class="col-sm-6" prop="name">
                            <Input type="text" placeholder="请输入" v-model="formItem.name"></Input>
                        </FormItem>  
                        <FormItem label="手机号码" class="col-sm-6" prop="mobile">
                            <Input type="text" placeholder="请输入" v-model="formItem.mobile"></Input>
                        </FormItem>                          
                        <FormItem label="生日" class="col-sm-6">
                            <DatePicker type="date" :transfer="true" placeholder="请选择" v-model="formItem.birthday" style="width:100%"></DatePicker>
                        </FormItem>  
                        <FormItem label="性别" class="col-sm-6">
                            <RadioGroup v-model="formItem.gender">
                                <Radio :label="el.value" :key="el.value" v-for="el in genderList">
                                    {{el.label}}
                                </Radio>
                            </RadioGroup>
                        </FormItem> 
                        <FormItem label="备注" class="col-sm-12">
                            <Input type="textarea" placeholder="请输入" v-model="formItem.comment"></Input>
                        </FormItem>                                                                                                                            
                    </Form>
                </Card>
            </TabPane>
            <TabPane label="详细档案">
                <Row class="clearfix" :gutter="20">
                    <i-col :sm="16">
                        <Card>
                            <p slot="title">基本信息</p>
                            <Form class="clearfix am-form-item am-form-body" ref="addMemberInfoForm" :label-width="70">
                                <FormItem label="身高" class="col-sm-6">
                                    <Input type="text" v-model="formItem.height">
                                        <span slot="append">cm</span>
                                    </Input>
                                </FormItem>  
                                <FormItem label="体重" class="col-sm-6">
                                    <Input type="text" v-model="formItem.weight">
                                        <span slot="append">kg</span>
                                    </Input>
                                </FormItem>  
                                <FormItem label="身份证" class="col-sm-6">
                                    <Input type="text" v-model="formItem.id_number"></Input>
                                </FormItem>  
                                <FormItem label="职业" class="col-sm-6">
                                    <Input type="text" v-model="formItem.job"></Input>
                                </FormItem>  
                                <FormItem label="婚否" class="col-sm-6">
                                    <RadioGroup v-model="formItem.is_married">
                                        <Radio label="1">
                                            是
                                        </Radio>
                                        <Radio label="0">
                                            否
                                        </Radio>
                                    </RadioGroup>
                                </FormItem> 
                                <FormItem label="血型" class="col-sm-6">
                                    <Select placeholder="血型" v-model="formItem.blood_type">
                                        <Option value="O型血">O型血</Option>
                                        <Option value="A型血">A型血</Option>
                                        <Option value="B型血">B型血</Option>
                                        <Option value="AB型血">AB型血</Option>
                                    </Select>
                                </FormItem>  
                                <FormItem label="家庭电话" class="col-sm-6">
                                    <Input type="text" v-model="formItem.home_tel"></Input>
                                </FormItem>  
                                <FormItem label="地址" class="col-sm-6">
                                    <Input type="text" v-model="formItem.address"></Input>
                                </FormItem>  
                                <FormItem label="个人爱好" class="col-sm-12">
                                    <Input type="textarea" v-model="formItem.hobbies"></Input>
                                </FormItem>                                                                                                                                                                                                                                                
                            </Form>
                        </Card>                     
                    </i-col>
                    <i-col :sm="8">
                        <Card>
                            <p slot="title">会员头像</p>
                            <div class="am-form-body">
                                <Upload
                                    ref="uploadpp"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="2048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :data="uploadParams"
                                    type="drag"
                                    :action="uploadURL"
                                >
                                    <div style="padding: 60px 0" v-if="!filePath">
                                        <Icon type="person" size="120" style="color: #ddd"></Icon>
                                    </div>
                                    <div v-if="filePath">
                                        <img :src="filePath" width="100" height="130" alt="">
                                    </div>                                    
                                </Upload>
                            </div>
                        </Card>
                    </i-col>
                </Row>
            </TabPane>                            
        </Tabs>
      </Modal>
  </span>
</template>

<script>
import util from '../../../util'
import SelectStore from '../store_select'
let modelData = ()=>{
    return {
        number: '',
        name: '',
        mobile: '',
        gender: '1',
        birthday: '',
        weixin_account: '',
        comment: '',
        height: '',
        weight: '',
        id_number: '',
        job: '',
        is_married: '0',
        blood_type: '',
        hobbies: '',
        home_tel: '',
        address: '',
        avatar: ''        
    }
}
export default {
    name: 'AddMember',
    data (){
        return {
            modalState: false,
            filePath: '',
            loading: false,
            formItem: {
                store_id: '',
                number: '',
                name: '',
                mobile: '',
                gender: '1',
                birthday: '',
                weixin_account: '',
                comment: '',
                height: '',
                weight: '',
                id_number: '',
                job: '',
                is_married: '0',
                blood_type: '',
                hobbies: '',
                home_tel: '',
                address: '',
                avatar: ''                  
            },
            rules: {
                name: [
                    { required: true, message: '会员姓名不能为空', trigger: 'blur' }
                ], 
                number: [
                    { required: true, message: '编号不能为空', trigger: 'blur' }
                ], 
                mobile: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { type: "string",pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误',trigger: 'blur' }
                ]                                                                                                                                              
            }
        }
    },
    computed: {
        genderList(){
            return this.$store.state.user.genderList;
        },
        uploadURL (){
            return `${API_PATH}/store/upload`;
        },
        uploadParams (){
            return {sid: this.$store.state.user.sid};
        },
        store_id () {
            return this.$store.state.story.store_id;
        }                
    },
    watch: {
        store_id (n,o) {
            this.formItem.store_id = n;
        },
        modalState (n,o){
            if(!n){
               this.filePath = "";
               Object.assign(this.formItem,modelData());
            }
        }
    },
    props: {
        title: {
            type: String,
            default: "添加会员"
        }
    },
    methods: {
        handleCancel (){
            this.modalState = false;
        },
        storeChange (v) {
            this.formItem.store_id = v;
        },
        handleSubmit (){
            this.$refs['addMemberForm'].validate(valid=>{
                if(valid){
                    this.loading = true;
                    let params = JSON.parse(JSON.stringify(this.formItem));
                    let path = "/boss/storeMember/create";
                    if(this.formItem.birthday&&this.formItem.birthday instanceof Date){
                        params.birthday = this.formItem.birthday.Format("yyyy-MM-dd");
                    }
                    params.gender = parseInt(params.gender);
                    this.$http.post(path,params).then(res=>{
                        if(res.code === 200){
                            this.$Message.success(res.message);
                            this.modalState = false;
                            this.$emit("on-success");                            
                        }else{
                            this.$Message.error(res.message);
                        }
                        this.loading = false;
                    }).catch(e=>{
                        this.loading = false;
                    });
                }else{
                    this.$Message.error("表单填写错误");
                }
            })
        },
        handleSuccess (res, file) {
            this.filePath = res.data.file.full_url;
            this.formItem.avatar = res.data.file.path;
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
        }      
    },
    mounted (){
        if(this.store_id){
            this.formItem.store_id = this.store_id;
        }
    },
    components: {
        SelectStore
    }
}
</script>

<style scoped>
    .am-form-item .ivu-form-item{
        margin-bottom: 5px;
    }
    .am-form-body{
        height: 242px;
    }
</style>
