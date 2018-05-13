<template>
<div>
  <Form ref="groupManagerForm2" :model="hasGroup">
    <FormItem
      v-for="(item, index) in hasGroup.items"
      :key="index"
      :prop="'items.' + index + '.name'"
      :rules="{required: true, message: '分组名称不能为空', trigger: 'blur'}">
      <Row>
        <Col span="14">
        <Input type="text" v-model="item.name" placeholder="请输入..."></Input>
        </Col>
        <Col span="9" offset="1">
        <Button  type="text" @click="handleDelete(item.id)">删除</Button>
        <Button  type="text" @click="handleSave(item.id,item.name)">保存</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
  <hr>
  <Form ref="groupManagerForm" :model="formDynamic">
    <FormItem
      v-for="(item, index) in formDynamic.items"
      :key="index"
      :prop="'items.' + index + '.name'"
      :rules="{required: true, message: '分组名称不能为空', trigger: 'blur'}">
      <Row>
        <Col span="14">
        <Input type="text" v-model="item.name" placeholder="请输入..."></Input>
        </Col>
        <Col span="9" offset="1">
        <Button icon="android-remove" @click="handleRemove(index)"></Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="12">
        <Button icon="android-add" @click="handleAdd"></Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
</div>
</template>
<script>
  export default {
    name: 'GroupManager',
    data () {
      return {
        formDynamic: {
          items: [
            {
              name: '',
              parent_id: 0
            }
          ]
        }
      }
    },
    computed: {
      hasGroup () {
        return {items: this.$store.state.story.storeGroupList};
      }
    },
    watch: {
      formDynamic: {
        deep: true,
        handler () {
          let flag = this.formDynamic.items.filter(e=>{
            return e.name !== '';
          }).length !== 0;
          this.$emit('on-change',!flag);
        }
      }
    },
    methods: {
      handleAdd () {
        this.formDynamic.items.push({
          name: '',
          parent_id: 0
        });
      },
      handleRemove (index) {
          this.formDynamic.items.splice(index,1);
      },
      handManageGroup(){
        this.$refs['groupManagerForm'].validate((valid)=>{
          if(valid){
            let data = {groups: this.formDynamic.items};
            this.$store.dispatch("ADD_STORE_GROUP",data).then((msg)=>{
              this.$Message.success(msg);
              this.$refs['groupManagerForm'].resetFields();
              this.formDynamic.items = [{
                name: '',
                parent_id: 0
              }];
            })
          }else{
            this.$Message.error('表单填写有误!');
          }
        })
      },
      cancelManageGroup(){
        this.$refs['groupManagerForm'].resetFields();
      },
      handleDelete (id){
        this.$Modal.confirm({
          title: '系统提示',
          content: '<h4 class="text-warning text-center">确认删除？</h4>',
          onOk: ()=>{
              this.$store.dispatch("GET_STORE_LIST");
              this.$store.dispatch("DELETE_STORE_GROUP",{id}).then((msg)=>{
                this.$Message.success(msg);
              }).catch((e)=>{
                this.$Message.error(e);
              });
          }
        });
      },
      handleSave (id,name) {
        this.$Modal.confirm({
          title: '系统提示',
          content: '<h4 class="text-warning text-center">确认保存？</h4>',
          onOk: ()=>{
            this.$store.dispatch("SAVE_STORE_GROUP",{id,name}).then((msg)=>{
              this.$Message.success(msg);
            }).catch((e)=>{
              this.$Message.error(e);
            });
          }
        });
      }
    }
  }
</script>
