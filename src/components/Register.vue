<template>
  <div class="login-box regbox" ref="loginbox">
    <div class="logo col-sm-12 col-md-10 col-lg-6 col-md-offset-2">
      <img src="../../static/logo.png" alt="logo">
    </div>
    <div class="login-wrap reg-wb">
      <div class="text-center f-tit ol-sm-12 col-md-5">
        <h3 style="margin-bottom: 10px">欢迎试用美自管理系统</h3>
      </div>
      <div class="col-sm-12">
        <hr>
      </div>
      <div class="col-sm-12 col-md-5">
        <div>
          客服电话：400-077-0829
        </div>
        <div class="text-muted f-ttt">
          提交信息后，工作人员会及时与您联系!
        </div>
        <Form :model="formItem" ref="formItem" :rules="ruleValidate">
          <FormItem prop="nick_name">
            <Input v-model="formItem.nick_name" placeholder="输入全名">
            <Icon type="person" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="mobile">
            <Input v-model="formItem.mobile" placeholder="输入手机号">
            <Icon type="ios-telephone" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="im_qq">
            <Input v-model="formItem.im_qq" placeholder="QQ|微信">
            <Icon type="chatbubbles" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="brand_name">
            <Input v-model="formItem.brand_name" placeholder="店铺名称">
            <Icon type="home" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>       
              <Select-City @cityChange="handleCityChange" @cityChange2="handleCityChange2" ref="selectCity">
                <Input  v-model="locationText" placeholder="店铺地址" slot readonly>
                  <Icon type="location" size="16" slot="prepend"></Icon>
                </Input>              
              </Select-City>
          </FormItem>
          <FormItem prop="address">
            <Input v-model="formItem.address"  placeholder="详细地址">
              <Icon type="ios-information" size="16" slot="prepend"></Icon>
            </Input>
          </FormItem>          
          <FormItem>
            <Button shape="circle" type="primary" long @click="handleSubmit('formItem')">申请试用</Button>
          </FormItem>
          <FormItem>
            <Col span="24" class="text-center">
            <span class="f-link"><router-link to="login">已有账号，直接登录</router-link></span>
            </Col>
          </FormItem>
        </Form>
      </div>
      <div class="col-md-7 hidden-xs hidden-sm gg-box">
      </div>
    </div>
  </div>
</template>

<script>
import types from '../store/types'
import SelectCity from  './select_city'
let _this = null;
export default {
  name: 'Register',
  data () {
      return {
          formItem: {
            mobile: "",
            im_qq: "",
            nick_name: "",
            province_id: '',
            city_id: '',
            area_id: '',
            brand_name: '',
            address: ''
          },
          locationText: "",
          ruleValidate: {
              mobile: [
                  { required: true, message: '请输入手机号码',trigger: 'blur' },
                  { type: "string",pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误',trigger: 'blur' }
              ],
              nick_name: [
                  {required: true,message: '请输入姓名',trigger: 'blur'},
              ],
              im_qq:[
                  {required: true,message: '请输入QQ或者微信',trigger: 'blur'}
              ],
              brand_name: [
                  {required: true,message: '请输入店铺名称',trigger: 'blur'}
              ],
              address: [
                  {required: true,message: '请输入店铺详细地址',trigger: 'blur'}
              ]              
          }
      }
  },
  methods: {
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let data = JSON.parse(JSON.stringify(this.formItem));
                this.$store.dispatch(types.USER_REGISTER,data).then((msg)=>{
                    this.$Message.success(msg);
                    this.$router.push({
                      path: '/login'
                    });
                })
            } else {
                this.$Message.error('表单验证失败!');
            }
        })
    },
    handleCityChange (selectedData) {
      [this.formItem.province_id,this.formItem.city_id,this.formItem.area_id] = [...selectedData];
    },
    handleCityChange2 (selectedData) {
      this.locationText = selectedData.map(e=>{return e.label}).join("/");
    },    
    keysub (e){
        if(e.keyCode === 13){
            this.handleSubmit('formItem');
        }
    }
  },
  created(){
      _this = this;
  },
  mounted(){
      document.body.addEventListener("keydown",this.keysub,false);
  },
  destroyed(){
      document.body.removeEventListener("keydown",this.keysub,false);
  },
  components: {
    SelectCity
  }
}
</script>

<style scoped>
  .login-wrap{
    height: 600px;
  }
  .gg-box{
    height: 435px;
    padding: 0 20px;
    background-image: url('../../static/bg.jpg');
    background-repeat: no-repeat;
    background-clip: content-box;
    background-size: cover;
  }
</style>
