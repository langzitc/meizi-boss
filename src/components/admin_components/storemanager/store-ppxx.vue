<template>
  <Card>
      <Alert type="warning" slot="title">
          <Row>
              <i-col :xs="12">
                  <h4 style="line-height:30px">品牌信息</h4>
              </i-col>
              <i-col :xs="12" class="text-right">
                  <Button type="primary" @click="modalState = true">编辑</Button>
              </i-col>
          </Row>
      </Alert>
      <Form :label-width="100" label-position="left" class="lg-form" style="padding-left:15px">
          <FormItem label="品牌名称">
                {{data.name}}
          </FormItem>
          <FormItem label="品牌标志">
              <img :src="data.logo_path_url" alt="" width="100px" height="100px">
          </FormItem>        
          <FormItem label="品牌客服">
                {{data.service_tel}}
          </FormItem>            
          <FormItem label="联系人姓名">
                {{data.contacts_name}}
          </FormItem>          
          <FormItem label="联系人电话">
                {{data.contacts_mobile}}
          </FormItem>

          <FormItem label="微信二微码">
              <img :src="data.wx_qr_url" width="100"/>
          </FormItem>
      </Form>
      <div class="mddesc-box" v-html="this.data.description">

      </div>
      <Modal
          v-model="modalState"
          ok-text="保存"
          class-name="modal-scroll"
          :loading="modalState"
          width="900"
          :mask-closable="false"
          title="编辑品牌信息">
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="btnLoading" @click="save">保存</Button>
            </div> 
            <Form ref="ppsz" :model="formValidate2" :rules="ruleValidate" :label-width="80">
            <FormItem label="品牌名称" prop="name" class="mzmy-m-inp">
                <Input v-model="formValidate2.name" placeholder="中文"></Input>
            </FormItem>
            <FormItem label="品牌标志">
                <Upload
                ref="uploadpp"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :on-error="handleError"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :data="uploadParams"
                type="drag"
                :action="uploadURL"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;position:relative" v-show="uploadList.length" v-for="(item,index) in uploadList" :key="index">
                    <img :src="item.url" width="58px" height="58px" v-show="item.status === 'finished'">
                    <Progress :percent="item.percentage" hide-info status="active" v-show="item.status !== 'finished'"></Progress>
                </div> 
                <div style="width: 58px;height:58px;line-height: 58px;" v-show="!uploadList.length">
                    <Icon type="camera" size="20"></Icon>
                </div>                               
                </Upload>
            </FormItem>
            <FormItem label="品牌客服" prop="service_tel" class="mzmy-m-inp">
                <Input v-model="formValidate2.service_tel" placeholder="手机|座机"></Input>
            </FormItem>
            <FormItem label="联系人姓名" prop="contacts_name" class="mzmy-m-inp">
                <Input v-model="formValidate2.contacts_name" placeholder="真实姓名"></Input>
            </FormItem>
            <FormItem label="联系人电话" prop="contacts_mobile" class="mzmy-m-inp">
                <Input v-model="formValidate2.contacts_mobile" placeholder="手机|座机"></Input>
            </FormItem>
            <FormItem label="品牌介绍">
                <textarea id="articleEditor"></textarea>
            </FormItem>
            </Form>            
      </Modal>            
  </Card>
</template>

<script>
import tinymce from 'tinymce'
import Utils from "../../../model/Utils"
let _this;
export default {
    name: 'store-ppxx',
    data () {
        return {
            modalState: false,
            btnLoading: false,
            formValidate2: {},
            defaultList: [],
            imgName: '',
            uploadList: [],
            ruleValidate: {
            name: [
                { required: true, message: '门店名称不能为空', trigger: 'blur' }
            ],
            contacts_mobile: [
                { type: "string",pattern: Utils.getMobileNumberRegex() , message: '手机号码格式错误',trigger: 'blur' }
            ],
            service_tel: [
                { type: "string",pattern_bak: Utils.getServiceTelNumberRegex(), message: '电话号码格式错误',trigger: 'blur' }
            ]
            }            
        }
    },
    watch: {
        modalState (n,o) {
            if(n){
                this.formValidate2 = JSON.parse(JSON.stringify(this.formValidate));
                this.uploadList = this.$refs.uploadpp.fileList;
                tinymce.init({
                    selector: '#articleEditor',
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
                    },
                    init_instance_callback: ()=>{
                        tinymce.get('articleEditor').setContent(this.formValidate2.description);   
                    }                    
                });
                let img = {
                    name: this.formValidate2.name,
                    url: this.formValidate2.logo_path_url,
                    status: 'finished'
                };
                this.uploadList = [img];
            }else{
                tinymce.get('articleEditor').destroy();
            }
        }
    },
    computed: {
        data: {
            get(){
                return this.$store.state.story.storeBrand
            },
            set(v) {

            }

        },
        uploadParams (){
            return {sid: this.$store.state.user.sid};
        },
        formValidate (){
            return this.$store.state.story.storeBrand;
        },
        uploadURL (){
            return `${API_PATH}/store/upload`;
        }        
    },
    methods: {
        cancel () {
            this.modalState = false;
        },
        save () {
            this.$refs['ppsz'].validate((valid) => {
            if (valid) {
                this.btnLoading = true;
                this.formValidate2.description = tinymce.get('articleEditor').getContent();
                this.$store.dispatch("UPDATE_STORE_BRAND",this.formValidate2).then((msg)=>{
                    this.btnLoading = false;
                    this.modalState = false;
                    this.$store.dispatch('GET_STORE_BRAND');
                    this.$Message.success(msg);
                }).catch((e)=>{
                    this.$Message.error(e);
                    this.btnLoading = false;
                });
            } else {
                this.$Message.error('表单填写错误!');
            }
            })            
        },
        handleSuccess (res, file) {
            //this.uploadList[0].url = res.data.file.full_url;
            let img = {
                name: file.name,
                url: res.data.file.full_url,
                status: 'finished'
            };
            this.uploadList = [];
            this.uploadList.push(img);
            this.formValidate2.logo_path = res.data.file.path;
        },
        handleError () {
            this.$Message.error("文件上传失败");
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
    mounted () {
      _this = this;
      this.$store.dispatch("GET_STORE_BRAND");        
    }
}
</script>

<style scoped lang="less">
    .mddesc-box{
        padding: 20px 15px;
        border: 1px solid #ddd;
    }
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
</style>
