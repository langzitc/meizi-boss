<template>
  <Card>
    <div slot="title">
      <Row>
        <i-col :xs="12" class="text-left">
          <Select v-model="group" style="width:200px" placeholder="选择店铺分组" clearable>
            <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <Select v-model="status" placeholder="门店状态" clearable style="width:150px">
            <Option value="0">已打烊</Option>
            <Option value="1">营业中</Option>
          </Select>
        </i-col>
        <i-col :xs="12" class="text-right">
          <Button icon="key" @click="showManageGroup">管理分组</Button>
          <AddSubStore>
            <Button icon="person-add">添加分店</Button>
          </AddSubStore>
          <Modal
            v-model="manageGroup"
            :loading="manageGroup"
            :mask-closable="false"
            class-name="modal-scroll"
            title="管理分组">
            <div slot="footer">
              <Button type="text" size="large" @click="cancelManageGroup">取消</Button>
              <Button type="primary" size="large" :disabled="saveManagerAble" @click="handManageGroup">保存</Button>
            </div>
            <GroupManager ref="groupManagers" @on-change="saveManagerAbleChange"></GroupManager>
          </Modal>
        </i-col>
      </Row>
    </div>
    <div>
      <Table :columns="storeColumn" :data="storeList" @on-selection-change="selectChange"></Table>
      <Row style="margin-top: 20px">
        <i-col :xs="12" class="text-left">
          <Dropdown placement="top" trigger="click" @on-visible-change="removeViewChange">
              <Button icon="person-add" :disabled="removeGroupState">移动分组</Button>
              <DropdownMenu slot="list">
                  <RadioGroup v-model="removeGroupId" style="width:100%" @on-change="removeGroupChange">
                  <DropdownItem v-for="el in groupList" :key="el.id">
                     <Radio :label="el.id">{{el.name}}</Radio>                   
                  </DropdownItem>
                  </RadioGroup> 
              </DropdownMenu>
          </Dropdown>          
        </i-col>
      </Row>
    </div>
  </Card>
</template>
<script>
    import AddSubStore from './addSubStore'
    import GroupManager from './groupManager'
    import Utils from "../../../model/Utils";
    let _this = null;
    export default {
        name: 'Mendian',
        data() {
            return {
                oldStoreGroup: [],
                group: '',
                manageGroup: false,
                saveManagerAble: true,
                status: '',
                removeGroupId: '',
                selectData: [],
                storeColumn: [
                  {
                  type: 'selection',
                  width: 60
                },
                {
                  title: '门店ID',
                  key: 'id',
                  width: 80
                },
                {
                  title: '门店名称',
                  key: 'name',
                  width: 120
                },
                {
                  title: '门店分组',
                  key: 'group_label',
                  width: 120
                },
                {
                  title: '营业状态',
                  key: 'status_label',
                  width: 120
                },
                {
                  title: '门店地址',
                  key: 'address',
                  ellipsis: true
                },
                {
                  title: '开店时间',
                  key: 'created_at',
                  width: 120,
                  className: 'table-ellipsis'
                },
                {
                  title: '操作',
                  className: 'mzmy-table-oper',
                  width: 200,
                  align: 'right',
                  render(h,p){
                    let dyBtn = p.row.status == 1 ? 
                      h('Button',{
                        style: {
                          marginLeft: '5px'
                        },
                        props: {
                          type: 'success',
                          size: 'small'
                        },
                        on: {
                          click(e){
                            _this.dayang(p.row.id,0,'打烊');
                          }
                        }                        
                      },'打烊') : 
                      h('Button',{
                        style: {
                          marginLeft: '5px'
                        },
                        props: {
                          type: 'warning',
                          size: 'small'
                        },
                        on: {
                          click(e){
                            _this.dayang(p.row.id,1,'营业');
                          }
                        }                        
                      },'营业');                                          
                    return h('div',[
                      h(AddSubStore,{
                          props: {
                            id: parseInt(p.row.id)
                          }
                      }),
                      dyBtn,
                      h('Button',{
                        style: {
                          marginLeft: '5px'
                        },
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        on: {
                          click(e){
                            _this.delSubStore(p.row.id);
                          }
                        }
                      },'删除')
                    ]);
                  }
                }
              ]
            }
        },
        computed: {
          groupList (){
            return this.$store.state.story.storeGroupList;
          },
          storeList (){
            let list = this.$store.state.story.storeList;
            return list.filter((e)=>{
              let flag1 = this.group ? e.group_id == this.group : true;
              let flag2 = this.status ? e.status == this.status : true;
              return flag1&&flag2;
            });
          },
          removeGroupState () {
            return this.selectData.length === 0;
          }
        },
        methods: {
            afterStoreSave() {

            },
            saveManagerAbleChange (status) {
              this.saveManagerAble = status;
            },
            showManageGroup() {
                this.manageGroup  = true;
                this.oldStoreGroup = Utils.clone(this.$store.state.story.storeGroupList);
            },
          selectChange (selectData) {
            this.selectData = selectData;
          },
          removeViewChange (visible) {
            if(visible){
              if(this.selectData.length === 1){
                this.removeGroupId = this.selectData[0].group_id;
              }else{
                this.removeGroupId = "";
              }
            }
          },
          removeGroupChange (v) {
            this.$Modal.confirm({
              title: '系统提示',
              content: '确认移动至该分组?',
              onOk: ()=>{
                  let params = {
                    store_id: this.selectData.map(e=>{return e.id}).join(","),
                    group_ids: v,
                    is_override: 1
                  };
                  this.$http.post('/boss/store/assignToGroup',params).then(res=>{
                    this.$Message.success(res.message);
                    this.removeGroupId = "";
                    this.selectData = [];
                    this.$store.dispatch("GET_STORE_LIST");
                  });                
              }
            });
          },
          handManageGroup(){
            this.$refs['groupManagers'].handManageGroup();
          },
          cancelManageGroup(){
              let globalStoreGroups = this.$store.state.story.storeGroupList;
              let isChanged = false;
              for(let i =0;i<this.oldStoreGroup.length; i++) {
                  let storeGroup = this.oldStoreGroup[i];
                  if(typeof(globalStoreGroups[i]) == undefined) {
                      continue;
                  }
                  if(globalStoreGroups[i].name != storeGroup.name) {
                      isChanged = true;
                      break;
                  }
              }
              if(isChanged) {
                  this.$store.dispatch("GET_STORE_GROUP",true);
              }
            this.manageGroup = false;
            this.$refs['groupManagers'].cancelManageGroup();
          },
          delSubStore(id){
            this.$Modal.confirm({
              title: '系统提示',
              content: '<h4 class="text-warning text-center">确认删除？</h4>',
              onOk: ()=>{
                this.$store.dispatch("DELETE_SUB_STORE",{id}).then((msg)=>{
                    _this.$store.dispatch("GET_STORE_LIST");
                  this.$Message.success(msg);
                })
              }
            });
          },
          dayang (id,status,title) {
            this.$Modal.confirm({
              title: '系统提示',
              content: '<h4 class="text-warning text-center">'+title+'？</h4>',
              onOk: ()=>{
                this.$store.dispatch("UPDATE_SUB_STORE",{id,status}).then((msg)=>{
                  this.$Message.success(msg);
                })
              }
            });            
          }
        },
        mounted () {
          this.$store.dispatch("GET_STORE_GROUP",true);
          _this = this;
        },
        components: {
          GroupManager,
          AddSubStore
        }
    }
</script>
<style type='less' scoped>
</style>
