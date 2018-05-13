<template>
    <span @click="modalState=true">
        <slot>
           <Button type="info">上传</Button>
        </slot>
        <Modal
            :title="title"
            v-model="modalState"
            ok-text="保存"
            class-name="modal-scroll"
            :loading="modalState"
            width="750"
            :mask-closable="false"  
            :transfer="true"          
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>  
            <Form :label-width="120" ref="uploadIdea" :model="params" :rules="rules">
                <FormItem label="创作员工" v-if="modalState">
                    <Row :gutter="10">
                        <i-col :xs="12">
                            <staff-select :employee_id="params.employee_id" @staff-change="staffChange"></staff-select>
                        </i-col>
                    </Row>
                </FormItem>
                <FormItem label="分类">
                    <Row :gutter="10">
                        <i-col :xs="4">
                            <Select placeholder="发长" v-model="params.category_id">
                                <Option v-for="el in categoryList" :key="el.id" :value="el.id">{{el.label}}</Option>
                            </Select>
                        </i-col>
                        <i-col :xs="4">
                            <Select placeholder="脸型" v-model="params.face_model">
                                <Option v-for="el in faceModeList" :key="el.id" :value="el.id">{{el.label}}</Option>
                            </Select>
                        </i-col>
                        <i-col :xs="4">
                            <Select placeholder="性别" v-model="params.gender">
                                <Option v-for="el in genderList" :key="el.value" :value="el.value">{{el.label}}</Option>
                            </Select>
                        </i-col>                                                
                    </Row>
                </FormItem>   
                <FormItem label="选择标签" prop="tags">
                    <Row :gutter="10">
                        <i-col :xs="12">
                            <Select placeholder="选择标签" multiple v-model="params.tags">
                                <Option v-for="el in tagList" :key="el.id" :value="el.id">{{el.label}}</Option>
                            </Select>
                        </i-col>
                    </Row>
                </FormItem>  
                <FormItem label="列表排序">
                    <Row :gutter="10">
                        <i-col :xs="12">
                            <InputNumber v-model="params.sort" :min="0"></InputNumber>
                        </i-col>
                    </Row>
                </FormItem>   
                <FormItem label="上传图片">
                    <Row :gutter="10">
                        <i-col :xs="20">
                            <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                v-if="showUpload"
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                :data="uploadParams"
                                :action="uploadURL"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="作品预览" v-model="visible" :transfer="false" class-name="modal-image">
                                <img :src="imgPath" v-if="visible" style="width: 100%">
                            </Modal>
                        </i-col>
                    </Row>
                </FormItem>  
                <FormItem label="作品描述">
                    <Row :gutter="10">
                        <i-col :xs="20">
                            <Input v-model="params.description" type="textarea" placeholder="作品描述"></Input>
                        </i-col>
                    </Row>
                </FormItem>                                                                             
            </Form>         
        </Modal>           
    </span>
</template>

<script>
import StaffSelect from '../staff_select'
export default {
    name: 'upload-idea',
    data () {
        return {
            modalState: false,
            params: {},
            imgPath: '',
            visible: false,
            uploadList: [],
            defaultList: [],
            rules: {
                tags:[{
                    required: true,
                    message: '至少选择一个标签'
                }] 
            },
            showUpload: false                   
        }
    },
    computed: {
      genderList () {
        return this.$store.state.user.genderList;
      },
      uploadURL (){
        return `${API_PATH}/store/upload`;
      },
      uploadParams (){
        return {sid: this.$store.state.user.sid};
      }                    
    },
    watch: {
        modalState (n,o) {
            if(n){
                this.init(this.id||false);
            }else{
                this.showUpload = false;
            }
        },
        showUpload (n,o) {
            if(n) {
                setTimeout(()=>{
                    this.uploadList = this.$refs.upload.fileList; 
                },200)                
            }
        }
    },
    props: {
        id: {
            type: Number
        },
        title: {
            type: String,
            default: '上传作品'
        },
        tagList: {
            type: Array,
            required: true
        },
        categoryList: {
            type: Array,
            required: true
        },
        faceModeList: {
            type: Array,
            required: true
        }      
    },
    methods: {
        handleView (item) {
            this.imgPath = item.url;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url = res.data.file.full_url;
            file.name = res.data.file.path;        
        },
        handleError () {
            this.$Message.error("图片上传失败");
        },        
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload () {
            return true;
        },        
        save () {
            this.$refs['uploadIdea'].validate(valid=>{
                if(valid){
                    let params = JSON.parse(JSON.stringify(this.params));
                    let images = this.uploadList.map(e=>{
                        return e.name;
                    });
                    params.images = images;
                    if(this.id){
                        params.id = this.id;
                    }
                    this.$http.post("/boss/employeeWorks/create",params).then(res=>{
                        this.$Message.success(res.message);
                        this.modalState = false;
                        this.$refs.upload.fileList = []; 
                        this.$emit('on-change');
                        this.init();
                    });
                }else{
                    this.$Message.error('表单填写有误');
                }
            });
        },
        cancel () {
            this.modalState = false;
        },
        staffChange (e) {
            this.params.employee_id = e.id;
        },
        init (id = false) {
            if(id){
                this.$http.get("/boss/employeeWorks/info",{params: {
                    id
                }}).then(res=>{
                    let d = res.data;
                    this.params = {
                        employee_id: d.employee_id,
                        category_id: d.category_id,
                        face_model: d.face_model,
                        gender: parseInt(d.gender),
                        tags: d.tags.map(e=>{return e.tag_id}),
                        sort: parseInt(d.sort),
                        images: d.images.map(e=>{return e.image_path}),
                        description: d.description                
                    };  
                    this.defaultList = d.images.map(e=>{
                        return {
                            name: e.image_path,
                            url: e.url
                        }                          
                    })  
                    this.showUpload = true;            
                })
            }else{
                this.params = {
                    employee_id: '',
                    category_id: '',
                    face_model: '',
                    gender: '',
                    tags: [],
                    sort: 1,
                    images: [],
                    description: ''                
                };  
                this.showUpload = true;         
            }
        }
    },
    components: {
        StaffSelect
    }
}
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .modal-image{
        z-index: 1001;
    }
</style>
