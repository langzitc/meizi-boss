<!-- 会员详细档案 -->
<template>
  <Row :gutter="10" class="hyjbxx">
    <i-col :xs="16">
        <Card>
          <div slot="title">
            <Row>
              <i-col :xs="12"><span class="text-sltitle text-warning">基本信息</span></i-col>
              <i-col :xs="12" class="text-right">
                <Button type="primary" size="small" @click="save1">保存</Button>
              </i-col>              
            </Row>
          </div>
          <Form :label-width="80" label-position="left" class="clearfix" style="height:242px">
              <FormItem label="身高" class="col-xs-6">
                  <Input type="text" v-model="formItem.height" size="small">
                      <span slot="append">cm</span>
                  </Input>
              </FormItem>  
              <FormItem label="体重" class="col-xs-6">
                  <Input type="text" v-model="formItem.weight" size="small">
                      <span slot="append">kg</span>
                  </Input>
              </FormItem>  
              <FormItem label="身份证" class="col-xs-6">
                  <Input type="text" v-model="formItem.id_number" size="small"></Input>
              </FormItem>  
              <FormItem label="职业" class="col-xs-6">
                  <Input type="text" v-model="formItem.job" size="small"></Input>
              </FormItem>  
              <FormItem label="婚否" class="col-xs-6">
                  <RadioGroup v-model="formItem.is_married">
                      <Radio label="1" size="small">
                          是
                      </Radio>
                      <Radio label="0" size="small">
                          否
                      </Radio>
                  </RadioGroup>
              </FormItem> 
              <FormItem label="血型" class="col-xs-6">
                  <Select placeholder="血型" v-model="formItem.blood_type" size="small">
                      <Option value="O型血">O型血</Option>
                      <Option value="A型血">A型血</Option>
                      <Option value="B型血">B型血</Option>
                      <Option value="AB型血">AB型血</Option>
                  </Select>
              </FormItem>  
              <FormItem label="家庭电话" class="col-xs-6">
                  <Input type="text" v-model="formItem.home_tel" size="small"></Input>
              </FormItem>  
              <FormItem label="地址" class="col-xs-6">
                  <Input type="text" v-model="formItem.address" size="small"></Input>
              </FormItem>  
              <FormItem label="个人爱好" class="col-xs-12">
                  <Input type="textarea" v-model="formItem.hobbies" size="small"></Input>
              </FormItem>                                                     
          </Form>         
        </Card>       
    </i-col>
    <i-col :xs="8">
      <Card>
        <div slot="title">
          <Row>
            <i-col :xs="12"><span class="text-sltitle text-warning">会员头像</span></i-col>           
          </Row>
        </div>
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
                <div v-if="filePath" style="padding: 60px 0">
                    <img :src="filePath" width="100" height="130" alt="">
                </div>                                    
            </Upload>
        </div>        
      </Card>     
    </i-col>
  </Row>
</template>

<script>
  import util from '../../../util'
  let _this;
  export default {
    name: 'MemberDoc',
    data () {
      return {
        formItem: {
          height: '',
          weight: '',
          id_number: '',
          job: '',
          is_married: '0',
          blood_type: '',
          hobbies: '',
          home_tel: '',
          address: '',
          store_id: '',
          id: ''    
        },
        filePath: ''
      }
    },
    watch: {
      isActivated (n,o) {
        if(n){
          this.init();
        }
      },
      member: {
        deep: true,
        handler: (n,o)=>{
          _this.init();
        }
      }      
    },
    props: {
        member: {
            type: Object,
            required: true
        },
        isActivated: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        uploadURL (){
            return `${API_PATH}/boss/storeMember/updateAvatar`;
        },
        uploadParams (){
            return {sid: this.$store.state.user.sid,id:this.member.id};
        },
        store_id () {
            return this.$store.state.story.store_id;
        }       
    },
    methods: {
        handleSuccess (res, file) {
            this.filePath = res.data.avatar_url; 
            this.$emit("on-change");
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
        init () {
            if(this.member.id&&this.member.detail){
              util.clone(this.formItem,this.member.detail);
              util.clone(this.formItem,this.member);
              this.filePath = this.member.avatar_url;
            }
            util.clone(this.formItem2,this.member);
        },
        save1 () {
            this.$emit('open-loading');
            this.$http.post('/boss/storeMember/update',this.formItem).then(res=>{
                if(res){
                    this.$Message.success(res.message);
                    this.$emit("on-change");                   
                }
                this.$emit('close-loading'); 
            });
        }              
    },
    mounted () {
      _this = this;
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