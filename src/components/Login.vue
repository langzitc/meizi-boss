<template>
  <div class="login-box" ref="loginbox">
    <div class="logo col-sm-12 col-md-10 col-lg-6 col-md-offset-2">
      <img src="../../static/logo.png" alt="logo">
    </div>
    <div class="login-wrap login-wb" v-bind:style="{height: hasValidateCode ? '400px' : '350px'}">
      <div class="form-group form-tip">
        <label style="color:#b24a6d"><i class="glyphicon glyphicon-log-out"></i>&nbsp;欢迎登录美自系统</label>
      </div>
      <div class="toggle-type" v-bind:class="loginType ? 'pass' : 'msg' " @click="toggleLogin" :title="loginType ? '密码登录' : '短信验证登录'">
        <div class="toggle-zd"></div>  
      </div>
      <div class="validate-msg" v-show="isSub">
        <label :class="flag ? 'text-success' : 'text-danger'"><i class="glyphicon" :class="flag ? 'glyphicon-ok' : 'glyphicon-remove' "></i><span>{{msg}}</span></label>
      </div>
      <div class="form-group">
        <div class="input-group" v-if="loginType">
                  <span class="input-group-addon">
                      <i class="glyphicon glyphicon-user"></i>
                  </span>
          <input type="text" v-model="formItem.tel" class="form-control input-lg" placeholder="手机|邮箱">
        </div>
        <hr>
      </div>
      <div class="form-group" v-if="!loginType">
        <div class="input-group">
                  <span class="input-group-addon">
                      <i class="glyphicon glyphicon-earphone"></i>
                  </span>
          <input type="text" v-model="formItem.tel" class="form-control input-lg" placeholder="手机">
        </div>
        <hr>
      </div>      

      <div class="form-group" v-if="loginType">
        <div class="input-group">
            <span class="input-group-addon">
                <i class="glyphicon glyphicon-lock"></i>
            </span>
          <input type="password" v-model="formItem.password" class="form-control input-lg" placeholder="请输入密码">
        </div>
        <hr>
      </div>     

      <div class="form-group" v-if="!loginType">
        <div class="input-group">
          <input type="text" v-model="formItem.is_random_code" class="form-control input-lg" placeholder="输入短信验证码">
            <span class="input-group-btn">
                <button @click="sendCode" type="button" class="btn" :disabled="isSend" v-bind:class="isSend ? 'btn-success' : 'btn-info'" style="padding: 9px 12px;font-size: 12px;">{{isSend ? sendTime+'s' : '获取短信验证码'}}</button>
            </span>
        </div>
        <hr>
      </div>


      <div class="form-group" v-if="hasValidateCode">
        <div class="input-group">
          <input type="text" v-model="formItem.msgCode" class="form-control input-lg" placeholder="输入验证码">
            <span class="input-group-btn">
                <img :src="validatePath" @click="reloadValidate" style="width: 110px;height:37px" title="点击换一张"/>
            </span>
        </div>
        <hr>
      </div> 



      <div class="form-group">
        <div>
          <Button type="primary" style="border-radius: 32px;padding:6px 0;font-size:16px;" long size="large" :loading="loading" @click="handleSubmit">登录</Button>
        </div>
        <hr>
      </div>
      <div class="form-group form-bt">
        <div class="clearfix">
          <div class="col-xs-6 pd-left f-link"><a href="javascript:;" @click="loginType = !loginType">{{loginType ? '短信验证登录' : '密码登录'}}</a></div>
          <div class="col-xs-6 text-right pd-right f-link"><router-link to="register">申请体验</router-link></div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import types from '../store/types'
import MD5 from 'md5'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
      return {
          isSub: false,
          flag: false,
          loginType: true,
          hasValidateCode: false,
          isMemberPassword: false,
          isSend: false,
          sendTime: 60,
          msg: "",
          formItem: {
              tel: '',
              msgCode: '',
              password: '',
              is_random_code: ''
          },
          dataTime: (new Date()).getTime(),
          failure_count: 0
      }
  },
  computed: {
    validatePath () {
      let sid = localStorage.getItem('mzmy-boss-sid')||Cookies.get('sid');
      return API_PATH+"/public/captcha?time="+this.dataTime+"&width=110&height=37&sid="+sid;
    },
    loading () {
      return this.$store.state.user.isLogin;
    }
  },
  watch: {
    loginType () {
      this.formItem = {
          tel: '',
          msgCode: '',
          password: '',
          is_random_code: ''        
      }
    },
    failure_count (n,o){
        if(n>2){
          this.hasValidateCode = true;
        }
    }
  },
  methods: {
    msgShow (msg,flag){
      this.isSub = true;
      this.msg = msg;
      this.flag = flag;
      setTimeout(()=>{
        this.isSub = false;
      },5000)
    },
    reloadValidate () {
      this.dataTime = (new Date()).getTime();
    },
    sendCode () {
      if(this.formItem.tel){
          if(this.formItem.tel.match(/^1[34578]\d{9}$/)){
            this.$http.post('/boss/public/setRandomPassword',{mobile:this.formItem.tel}).then(res=>{
              this.$Message.success("验证码已发送至您的手机，60s后可再次发送");
              this.isSend = true;
              this.sendTime = 60;
              let s = setInterval(()=>{
                if(this.sendTime === 1){
                  clearInterval(s);
                  this.isSend = false;
                  return;
                }
                this.sendTime--;
              },1000)
            }) 
          }else{
            this.$Message.warning("手机号格式错误");
          }       
      }else{
        this.$Message.warning("请输入手机号");
      }
    },
    toggleLogin () {
      this.loginType = !this.loginType;
    },
    handleSubmit () {
        if(this.loginType){
          if(!this.formItem.tel){
            this.msgShow("账号不能为空",false)
          }
          else if(!this.formItem.password){
            this.msgShow("密码不能为空",false)
          }
          else if(!this.formItem.password.match(/^\w{6,16}$/)){
            this.msgShow("密码错误",false);
          }
          else if(!this.formItem.tel.match(/^1[34578]\d{9}$/)&&!this.formItem.tel.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
            this.msgShow("账号格式错误",false)
          }
          else{
              let params = {
                username: this.formItem.tel,
                password: this.formItem.password                
              };
              if(this.hasValidateCode){
                if(this.formItem.msgCode){
                  params.verify_code = this.formItem.msgCode;
                }else{
                  this.msgShow("请输入图形验证码",false);
                  return;
                }
              }          
              this.$store.dispatch(types.USER_LOGIN,params).then((msg)=>{
                Cookies.remove("failure_count");
                localStorage.setItem("mzmy_uname",this.formItem.tel);
                this.msgShow("登录成功!正在跳转...",true);
                localStorage.setItem("mzmy_pwd",MD5(this.formItem.password)); 
              }).catch((msg)=>{
                this.failure_count++;
                this.msgShow(msg||"用户名或密码不正确",false);
                Cookies.set("failure_count",this.failure_count+""); 
              })
          }          
        }else{
          if(this.formItem.tel){
            if(this.formItem.is_random_code){
              let params = {
                password: this.formItem.is_random_code,
                username: this.formItem.tel,
                is_random_code: 1
              }
              if(this.hasValidateCode){
                if(this.formItem.msgCode){
                  params.verify_code = this.formItem.msgCode;
                }else{
                  this.msgShow("请输入图形验证码",false);
                  return;
                }
              }
              this.$store.dispatch(types.USER_LOGIN,params).then((msg)=>{
                Cookies.remove("failure_count");
                localStorage.setItem("mzmy_uname",this.formItem.tel);
                this.msgShow("登录成功!",true);
              }).catch((msg)=>{
                this.failure_count++;
                this.msgShow("用户名或密码不正确",false);
                Cookies.set("failure_count",this.failure_count+"");
              })           
            }else{
              this.msgShow("请输入短信验证码",false)
            }
          }else{
              this.msgShow("请输入手机号",false)
          }
        }
    },
    goRegister () {
      this.$router.push("/register");
    },
    keysub (e){
        if(e.keyCode === 13){
            this.handleSubmit();
        }
    }
  },
  created(){
      let uname = localStorage.getItem("mzmy_uname");
      let pwd = localStorage.getItem("mzmy_pwd");
      this.formItem.tel = uname ? uname : "";
      let fn = Cookies.get('failure_count');
      if(fn){
        this.failure_count = parseInt(fn);
      }
      document.body.addEventListener("keydown",this.keysub,false);
  },
  destroyed(){
      document.body.removeEventListener("keydown",this.keysub,false);
  }
}
</script>

<style lang="less" scoped>
  .form-group{
    margin-bottom: 30px;
  }
  .form-group hr{
    display: none;
  }
  .toggle-type{
    position: absolute;
    right: 20px;
    top: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    overflow: hidden;
    .toggle-blank{
      width: 40px;
      height: 40px;
    }
    &.pass{
      background-image: url('../../static/pass-l.png');
    }
    &.msg{
      background-image: url('../../static/msg-l.png');
    }     
    .toggle-zd{
      width: 50px;
      height: 40px;
      transform: rotateZ(45deg);
      background: #fff;
      position: absolute;
      left: -20px;
      bottom: -15px;
    }
  } 
  .input-group-append{
    display: inline-block;
    width: 60px;
    height: 40px;
    position: absolute;
    right: 0;
  }
</style>
