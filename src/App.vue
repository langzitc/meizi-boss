<template>
  <div id="app">
  <transition>
    <router-view></router-view>
  </transition>
  <Modal
      title="修改密码"
      v-model="modalState"
      ok-text="修改"
      class-name="modal-scroll"
      :loading="modalState"
      width="450"
      :mask-closable="false"            
  > 
    <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button :loading="btnLoading" type="primary" size="large" @click="save">保存</Button>
    </div>     
    <Form ref="resetPassword" :model="formItem" :rules="ruleValidate" :label-width="120">
          <FormItem prop="old_password"  label="旧密码">
              <Input type="password" placeholder="请输入旧密码" v-model="formItem.old_password"></Input>
          </FormItem>
          <FormItem prop="new_password"  label="新密码">
              <Input type="password" placeholder="请输入新密码" v-model="formItem.new_password"></Input>
          </FormItem>
          <FormItem prop="rnew_password"  label="确认密码">
              <Input type="password" placeholder="确认新密码" v-model="formItem.rnew_password"></Input>
          </FormItem>                            
    </Form>    
  </Modal> 
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
let _this;
let validatePassword = (rule, value, callback) =>{
  if(value !== _this.formItem.new_password){
    callback(new Error('两次密码不一致'));
  }
  callback();
}
export default {
  name: 'app',
  data () {
    return {
      btnLoading: false,
      formItem: {
        old_password: '',
        new_password: '',
        rnew_password: ''
      },
      ruleValidate: {
        old_password: [
            { required: true, message: '旧密码不能为空',trigger: 'blur' }
        ],
        new_password: [
            { required: true, message: '新密码不能为空',trigger: 'blur' },
            { type: 'string', min: 6,max: 16, message: '密码至6～16位', trigger: 'blur' }
        ],
        rnew_password: [
            { required: true, message: '请确认新密码',trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
        ],                
      }
    }
  },
  computed: {
    ...mapState({
      modalState: state => state.user.setPasswordModal
    })
  },
  methods: {
    save () {
      this.$refs['resetPassword'].validate(valid=>{
        if(valid){
          this.btnLoading = true;
          this.$http.post("/account/changePassword",{
            old_password: this.formItem.old_password,
            new_password: this.formItem.new_password
          }).then(res=>{
            this.btnLoading = false;
            this.$Message.success(res.message);
            this.$store.commit('RESET_PASSWORD');
          }).catch(e=>{
            this.btnLoading = false;
          })          
        }
      })
    },
    cancel () {
      this.$refs['resetPassword'].resetFields();
      this.$store.commit('RESET_PASSWORD');
    }
  },
  async created(){
    _this = this;
    axios.defaults.headers = {
      sid: this.$store.state.user.sid
    };    
  //sid init
    let sid = Cookies.get('mzmy-boss-sid')||localStorage.getItem('mzmy-boss-sid');
    if(!sid){
      let res = await axios.get("/public/init");
      sid = res.data.sid;
      Cookies.set('mzmy-boss-sid',sid);
      localStorage.setItem('mzmy-boss-sid',sid);
    }
    axios.defaults.headers.sid = sid;  
    let session = Cookies.getJSON("mzmy_session");
    if(session){
      this.$store.commit("USER_INIT",session);
    }else{
      if(this.$router.currentRoute.path.includes("/admin")){
        this.$store.commit("USER_LOGOUT",session);
      }
    }
    this.$store.dispatch("GET_PROVINCE");
    this.$store.dispatch("GENDER_LIST");
  }
}
</script>

<style>
</style>
