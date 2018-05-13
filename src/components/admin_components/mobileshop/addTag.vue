<template>
    <span @click="modalState=true">
        <slot>
            <Button type="success">添加分类</Button>
        </slot>
        <Modal
            title="分类管理"
            v-model="modalState"
            ok-text="保存"
            class-name="modal-scroll"
            :loading="modalState"
            width="750"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>  
            <Tree :data="data" :render="renderContent"></Tree>        
        </Modal>        
    </span>
</template>

<script>
let format = (data)=>{
    let arr = [];
    data.forEach(e=>{
        let obj = {};
        obj.name = e.label;
        obj.id = e.id||null;
        obj.parent_id = e.parent_id;
        obj.expand = true;
        if(e.children&&e.children.length){
            obj.children = format(e.children);   
        }
        arr.push(obj);
    });
    return arr;
}
export default {
    name: 'add-tag',
    data () {
        return {
            modalState: false,
            buttonProps: {
                type: 'ghost',
                size: 'small',
            },            
            data: [{
                id: 0,
                name: '发长',
                parent_id: -1,
                code: 'CATEGORY',
                expand: true,
                children: []
            },{
                id: 0,
                name: '脸型',
                parent_id: -1,
                code: 'FACE_MODEL',
                expand: true,
                children: []
            },{
                id: 0,
                name: '标签',
                parent_id: -1,
                code: 'TAG',
                expand: true,
                children: []
            }]
        }
    },
    props: {
        tagList: {
            type: Array,
            required: true
        },
        categoryList: {
            type: Array,
            required: true
        },
        faceModeList: {
            type: Array,
            required: true
        }
    },
    watch: {
       tagList () {
            this.data[2].children = format(this.tagList);
       },
       categoryList () {
            this.data[0].children = format(this.categoryList);
       },
       faceModeList () {
            this.data[1].children = format(this.faceModeList);
       } 
    },
    methods: {
        save () {
            let d = JSON.parse(JSON.stringify(this.data));
            this.$http.post("/boss/storeOption/batchCreateAndUpdate",d).then((res)=>{
                this.$Message.success(res.message);
                this.$emit("on-change");
                this.modalState = false;
            })             
        },
        cancel () {
            this.modalState = false;
        },
        renderContent (h, { root, node, data }) {
            let btnGroup = [];
            if(data.parent_id != -1){
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
                btnGroup.push(
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-pricetag-outline'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        attrs: {
                            title: '编辑'
                        },                          
                        on: {
                            click: () => { this.edit(data) }
                        }
                    })                      
                );                             
            }else{
                btnGroup.push(
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        attrs: {
                            title: '添加'
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
                            type: 'social-instagram',
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
            this.$Modal.confirm({
                title: '分类名称',
                render(h){
                    return h('input',{
                        attrs: {
                            class: 'form-control',
                            placeholder: '请输入分类或标签名称',
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
                    }else{
                        this.$Message.error("名称不能为空");
                    }
                }
            });                
        },
        edit (data) {
            this.$update(data,'edit')
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
                        this.$http.post("/boss/storeOption/delete",{id: data.id}).then((res)=>{
                            this.$Message.success(res.message);
                            this.$emit("on-change");
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

<style>

</style>
