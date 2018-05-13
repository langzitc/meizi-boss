<template>
    <span @click="modalState=true">
        <slot>
            <Button type="success">上传图片</Button>
        </slot>
        <Modal
            title="上传轮播图片"
            v-model="modalState"
            class-name="modal-scroll"
            :loading="modalState"
            width="500"
            :mask-closable="false"  
            :transfer="true"          
        >
            <div slot="footer">
                <Button type="text" size="large" @click="modalState = false">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>   
            <Form :label-width="120">
                <FormItem label="标题">
                    <Input type="text" v-model="formItem.title" placeholder="图片标题"></Input>
                </FormItem>
                <FormItem label="图片跳转链接">
                    <Input type="text" v-model="formItem.url" placeholder="图片跳转链接"></Input>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber :min="0" :step="1" :max="100" v-model="formItem.sort_order"></InputNumber>
                </FormItem>               
                <FormItem label="上传图片">
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
                </FormItem>                                
            </Form>      
        </Modal>        
    </span>
</template>

<script>
export default {
    name: 'addlooppic',
    data () {
        return {
            modalState: false,
            formItem: {
                code: 'Banner',
                title: '',
                url: '',
                path: '',
                store_id: '',
                sort_order: 0
            },
            imgPath: '',
            visible: false,
            uploadList: [],
            defaultList: [],
            showUpload: false              
        }
    },
    computed: {
        store_id () {
            return this.$store.state.story.store_id;
        },
        uploadURL (){
            return `${API_PATH}/store/upload`;
        },
        uploadParams (){
            return {sid: this.$store.state.user.sid};
        }         
    },
    props: {
        id: {
            type: Number
        }
    },
    watch: {
        modalState (n,o){
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
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '只能上传一张图片'
                });
            }
            return check;
        },        
        save () {
            let params = JSON.parse(JSON.stringify(this.formItem));
            if(this.store_id){
                params.store_id = this.store_id;
            }else{
                this.$Message.error('请选择门店');
                return;
            }
            if(this.uploadList.length){
                params.path = this.uploadList[0].name;
            }
            if(!params.title){
                this.$Message.error("图片标题不能为空");
            }else if(!params.path){
                this.$Message.error('请上传图片');
            }else{
                this.$http.post("/boss/storeBanner/create",params).then(res=>{
                    this.$Message.success(res.message);
                    this.$refs.upload.fileList = []; 
                    this.$emit('on-change');
                    this.modalState = false;
                });
            }
        },
        init (id = false) {
            if(id){
                this.$http.get("/boss/storeBanner/info",{params: {
                    id
                }}).then(res=>{
                    let d = res.data;
                    Object.assign(this.formItem,d);
                    this.defaultList = [{
                        name: d.path,
                        url: d.path_url                        
                    }]; 
                    this.showUpload = true;            
                })
            }else{
                this.formItem = {
                    code: 'Banner',
                    title: '',
                    url: '',
                    path: '',
                    store_id: ''               
                };  
                this.showUpload = true;         
            }
        }       
    }
}
</script>

<style lang="less" scoped>
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
