<template>
    <div>
        <Form ref="addStaffTypeForm" :model="hasGroup">
            <FormItem
                    v-for="(item, index) in hasGroup.items"
                    :key="index"
                    :prop="'items.' + index + '.name'"
                    :rules="{required: true, message: '类型名称不能为空', trigger: 'blur'}">
                <Row>
                    <Col span="14">
                    <Input type="text" readonly v-model="item.name" placeholder="请输入..."></Input>
                    </Col>
                </Row>
                <Row v-for="item2 in item.children" v-if="item.children&&item.children.length">
                    <Col span="14">
                    <Input type="text" readonly v-model="item2.name" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="9" offset="1">
                    <Button  type="text" @click="handleDelete(item2.id)">删除</Button>
                    <Button  type="text" @click="handleSave(item2.id,item2.name)">保存</Button>
                    </Col>
                </Row>                
            </FormItem>
        </Form>
        <hr>
        <Form ref="addStaffTypeForm2" :model="formDynamic">
            <FormItem
                    v-for="(item, index) in formDynamic.items"
                    :key="index"
                    :prop="'items.' + index + '.name'"
                    :rules="{required: true, message: '类型名称不能为空', trigger: 'blur'}">
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
        name: 'AddStaffType',
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
        props: {
            store_id: {
                type: Number,
                default: 0
            },
            staffTypeList: {
                type: Array,
                default(){
                    return [];
                }
            }
        },
        computed: {
            hasGroup () {
                return {items: this.staffTypeList};
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
                this.$refs['addStaffTypeForm2'].validate((valid)=>{
                    if(valid){
                        if(this.store_id){
                            let d = JSON.parse(JSON.stringify(this.formDynamic.items));
                            d.map((e)=>{
                                e.store_id = this.store_id;
                            })
                            let data = {items: d};
                            this.$store.dispatch("ADD_STAFF_TYPE",data).then((msg)=>{
                                this.$Message.success(msg);
                                this.$store.dispatch("GET_STAFF_TYPE_LIST",{store_id: this.store_id})
                                this.formDynamic.items = [{
                                    name: '',
                                    parent_id: 0
                                }];
                                this.$refs['addStaffTypeForm2'].resetFields();
                            }).catch((e)=>{
                                this.$Message.error(e);
                            });                            
                        }else{
                           this.$Message.error('请选择门店!'); 
                        }
                    }else{
                        this.$Message.error('表单填写有误!');
                    }
                })
            },
            cancelManageGroup(){
                this.$refs['addStaffTypeForm2'].resetFields();
            },
            handleDelete (id){
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '<h4 class="text-warning text-center">确认删除？</h4>',
                    onOk: ()=>{
                        this.$store.dispatch("STAFF_TYPE_DELETE",{id}).then((msg)=>{
                            this.$Message.success(msg);
                            this.$store.dispatch("GET_STAFF_TYPE_LIST",{store_id: this.store_id})
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
                        this.$store.dispatch("STAFF_TYPE_UPDATE",{id,name,store_id: this.store_id}).then((msg)=>{
                            this.$Message.success(msg);
                            this.$store.dispatch("GET_STAFF_TYPE_LIST",{store_id: this.store_id})
                        }).catch((e)=>{
                            this.$Message.error(e);
                        });
                    }
                });
            }
        }
    }
</script>
