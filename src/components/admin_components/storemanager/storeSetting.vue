<style type="less" scoped>
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
<template>
    <div class="demo-tabs-style2">
      <Card>
        <Tabs>
          <TabPane label="品牌信息设置">
            <Card class="clearfix">
              <p slot="title">品牌信息设置</p>
              <Form ref="ppsz" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="品牌名称" prop="name" class="mzmy-m-inp">
                  <Input v-model="formValidate.name" placeholder="中文"></Input>
                </FormItem>
                <FormItem label="品牌标志">
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
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
                    :before-upload="handleBeforeUpload"
                    :data="uploadParams"
                    type="drag"
                    :action="uploadURL"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="camera" size="20"></Icon>
                    </div>
                  </Upload>
                </FormItem>
                <FormItem label="品牌客服" prop="service_tel" class="mzmy-m-inp">
                  <Input v-model="formValidate.service_tel" placeholder="手机|座机"></Input>
                </FormItem>
                <FormItem label="联系人姓名" prop="contacts_name" class="mzmy-m-inp">
                  <Input v-model="formValidate.contacts_name" placeholder="真实姓名"></Input>
                </FormItem>
                <FormItem label="联系人电话" prop="contacts_mobile" class="mzmy-m-inp">
                  <Input v-model="formValidate.contacts_mobile" placeholder="手机|座机"></Input>
                </FormItem>
                <FormItem label="品牌介绍">
                  <textarea id="articleEditor"></textarea>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('ppsz')">保存</Button>
                </FormItem>
              </Form>
            </Card>
          </TabPane>
          <TabPane label="门店管理">
              <Mendian></Mendian>
          </TabPane>
        </Tabs>
      </Card>
    </div>
</template>

<script>
  import tinymce from 'tinymce';
  import Mendian from './mendian.vue'
  export default {
    name: 'StoreSetting',
    data () {
      return {
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        ruleValidate: {
          name: [
            { required: true, message: '门店名称不能为空', trigger: 'blur' }
          ],
          contacts_mobile: [
            { type: "string",pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误',trigger: 'blur' }
          ],
          service_tel: [
            { type: "string",pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误',trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      Mendian
    },
    methods: {
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formValidate.description = tinymce.get('articleEditor').getContent();
            this.$store.dispatch("UPDATE_STORE_BRAND",this.formValidate).then((msg)=>{
              this.$Message.success(msg);
            }).catch((e)=>{
              this.$Message.error(e);
            });
          } else {
            this.$Message.error('表单填写错误!');
          }
        })
      },
      handleRemove (file) {
        const fileList = this.$refs.uploadpp.fileList;
        this.$refs.uploadpp.fileList.splice(fileList.indexOf(file), 1);
        this.formValidate.logo_path = "";
      },
      handleSuccess (res, file) {
        this.uploadList[0].url = res.data.file.full_url;
        this.formValidate.logo_path = res.data.file.path;
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
      },
      handleBeforeUpload (f) {
        const check = this.uploadList.length == 0;
        if (!check) {
          this.$Notice.warning({
            title: '只能上传一张图片'
          });
        }
        return check;
      }
    },
    computed: {
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
    mounted () {
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
        }
      });
      this.$store.dispatch("GET_STORE_BRAND").then(()=>{
        this.uploadList.push({
          name: this.formValidate.name,
          url: this.formValidate.logo_path_url,
          status: 'finished'
        })
        document.getElementById('articleEditor').value =  this.formValidate.description;
      });
    },
    destroyed () {
      tinymce.get('articleEditor').destroy();
    }
  }
</script>

