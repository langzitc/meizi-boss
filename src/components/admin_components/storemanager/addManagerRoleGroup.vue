<template>
  <div>
      <Form ref="addManagerRoleGroupForm" :model="formValidate" :rules="ruleValidate">
          <FormItem label="权限组名称" :label-width="100" prop="name">
              <Input type="text" v-model="formValidate.name" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="描述" :label-width="100">
              <Input type="textarea" style="width: 300px" v-model="formValidate.description"></Input>
          </FormItem>


          <Card class="add-manger-group-card2">
              <h5 slot="title">设置权限</h5>
              <MenuCheckBoxGroup
                      @changed="checkedMenusChanged"
                      :values="selectMenu"></MenuCheckBoxGroup>
          </Card>
      </Form>

  </div>
</template>
<script>
import MenuCheckBoxGroup from "../../common/MenuCheckBoxGroup.vue"

export default {
  name: 'AddManagerRoleGroup',
  data (){
      return {
          oldGid : 0,
        formValidate: {
            name: '',
            description: ''
        },
        newCheckedMenus: null,
        ruleValidate: {
          name: [
            { required: true, message: '权限组名称不能为空', trigger: 'blur' }
          ]
        }
      }
  },
  props: {
      selectMenu: {
          type: Array,
          default(){
              return [];
          }
      },
      gid: {
          type: Number,
          default: 0
      },
      formValidates: {
          type: Object,
          default(){
              return {
                  name: '',
                  description: '',
                  initEdit: true,
              };
          }
      }
  },
  computed: {
      menu (){
        return this.$store.state.user.menu;
      }
  },
  methods: {
      checkGroupChange(v){

      },
      checkedMenusChanged(v) {
          console.log(v);
          this.newCheckedMenus = v;
      },
      handSubmit (){
        let path = "/boss/storeManagerRole/create";
        let params = {
            ...this.formValidate,
            menus: this.selectMenu
        };
        if(this.newCheckedMenus !== null) {
            params.menus = this.newCheckedMenus;
        }
        if(this.gid){
            path = "/boss/storeManagerRole/update";
            params.id = this.gid;
        }
        return new Promise((resolve,reject)=>{
          this.$refs['addManagerRoleGroupForm'].validate((valid)=>{
              if(valid){
                  this.$http.post(path,params).then((res)=>{
                      if(res.code == 200){
                          this.$Message.success(res.message);
                          this.$refs['addManagerRoleGroupForm'].resetFields();
                          resolve();
                      }else{
                          reject();
                          this.$Message.error(res.message);
                      }
                  }).catch(e=>{
                      reject(e);
                  });
              }else{
                  this.$Message.error('表单验证失败');
                  reject();
              }
          })            
        });
      },
      handCancel (){
        this.$refs['addManagerRoleGroupForm'].resetFields();
      }
  },
  updated(){
      if(this.gid){
          if(this.formValidates.initEdit) {
              this.formValidate.name = this.formValidates.name;
              this.formValidate.description = this.formValidates.description;
              this.formValidates.initEdit = false;
          }
      }
  },
  components:{
      MenuCheckBoxGroup
  },
  mounted(){

  }
}
</script>
<style lang="less">
.amr-fir{
  color: #000;
}
.fg-line{
    width: 100%;
    height: 1px;
    background-color: #ddd;
}
</style>


