<template>
    <div>
        <Alert type="warning"><Icon type="alert" color="#9f1d49" style="margin-right:15px"></Icon>添加、修改之后请点击&nbsp;&nbsp;保存</Alert>
        <Tree :data="data" :render="renderContent"></Tree>
    </div>
</template>
<script>
    export default {
        name: 'AddStaffType',
        data () {
            return {
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                },
                data: []
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
        watch: {
           staffTypeList(n,o){
                let format = (data)=>{
                    let arr = [];
                    data.map(e=>{
                        let obj = {};
                        obj.name = e.name;
                        obj.id = e.id||null;
                        obj.parent_id = e.parent_id;
                        obj.expand = false;
                        if(e.children&&e.children.length){
                            obj.children = format(e.children);   
                        }
                        arr.push(obj);
                    });
                    return arr;
                }
                this.data =  format(this.staffTypeList);
           } 
        },
        methods: {
            cancelManageGroup(){
                
            },
            handManageGroup(){
                let d = JSON.parse(JSON.stringify(this.data));
                let data = {store_id: this.store_id,items: d};
                this.$store.dispatch("ADD_STAFF_TYPE",data).then((msg)=>{
                    this.$Message.success(msg);
                    this.$emit("updatestafftype");
                }).catch((e)=>{
                    this.$Message.error(e);
                });  
            },            
            renderContent (h, { root, node, data }) {
                let btnGroup = [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-pricetag-outline'
                        }),
                        attrs: {
                            title: '修改'
                        },
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.edit(data) }
                        }
                    })                      
                ];
                if(data.parent_id != 0){
                    btnGroup.push(
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },   
                            attrs: {
                                title: '删除'
                            },                                                     
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })                         
                    );                    
                }else{
                    btnGroup.push(
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            attrs: {
                                title: '添加'
                            },                              
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        })                         
                    );                                         
                }
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'android-person',
                                size: 16
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.name)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, btnGroup)
                ]);
            },
            $update (data,type = 'add'){
                let v = type === 'add' ? "" : data.name;
                let _this = this;
                this.$Modal.confirm({
                    title: '职位名称',
                    render(h){
                        return h('input',{
                            attrs: {
                                class: 'form-control',
                                placeholder: '请输入职位名称',
                                value: type === 'add' ? '': data.name 
                            },
                            style: {
                                marginTop: "30px"
                            },
                            on: {
                                input(e){
                                    v = e.target.value;
                                }
                            }
                        },v)
                    },
                    onOk(){
                        if(v){
                            if(type === 'add'){
                                let children = data.children || [];
                                children.push({
                                    name: v,
                                    parent_id: data.id,
                                    expand: true
                                });
                                this.$set(data, 'children', children);                                
                            }else{
                                data.name = v;
                            }
                            _this.$emit('on-change');
                        }else{
                            this.$Message.error("名称不能为空");
                        }
                    }
                });                
            },
            edit (data) {
                this.$update(data,'edit');
            },
            append (data) {
                this.$update(data);
            },
            remove (root, node, data) {
                let del = ()=>{
                    let parentKey = root.find(el => el === node).parent;
                    let parent = root.find(el => el.nodeKey === parentKey).node;
                    let index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);                    
                }
                if(data.id){
                    this.$Modal.confirm({
                        title: '系统提示',
                        content: '<h4 class="text-warning text-center">确认删除？</h4>',
                        onOk: ()=>{
                            this.$store.dispatch("STAFF_TYPE_DELETE",{id: data.id}).then((msg)=>{
                                this.$Message.success(msg);
                                this.$emit("updatestafftype");
                            }).catch((e)=>{
                                this.$Message.error(e);
                            });
                        }
                    });                     
                }else{
                    del();
                }

            }                        
        }
    }
</script>
