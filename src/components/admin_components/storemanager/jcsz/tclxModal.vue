<template>
    <span @click="showModal">
        <slot>
            <Button type="info" size="small">编辑</Button> 
        </slot>
        <Modal
            title="设置套餐类型"
            v-model="modalState"
            class-name="modal-scroll"
            :loading="modalState"
            width="450"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" :loading="btnLoading" size="large" @click="save">保存</Button>
            </div> 
            <Form :label-width="120" ref="tclxmodalForm" :model="formItem" :rules="rules">
                <FormItem label="类型名称" prop="name">
                    <Input placeholder="类型名称" v-model="formItem.name" type="text"></Input>
                    <p class="text-muted">
                        推荐设置：洗吹类、剪发类、染发类、护发类、接发类、美容类等
                    </p>
                </FormItem>
                <!-- <FormItem label="所属部门" prop="department_id">
                    <Select placeholder="选择部门" v-model="formItem.department_id">
                        <Option :value="el.id" v-for="el in departList" :key="el.id">{{el.name}}</Option>
                    </Select>
                </FormItem>                 -->
            </Form>
        </Modal>           
    </span>      
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'tclx-modal',
    data () {
        return {
            modalState: false,
            btnLoading: false,
            formItem: {
                name: '',
                // department_id: ''
            },
            rules: {
                name: [{ required: true, message: '类型名称不能为空', trigger: 'blur' }],
                // department_id: [{ required: true, message: '所属部门不能为空', trigger: 'change' }]
            }
        }
    },
    computed: {
        ...mapState({
            departList: state => state.story.departList
        })         
    },
    props: {
        data: {
            type: Object
        }
    },
    watch: {
        modalState (n,o){
            if(n&&this.data&&this.data.id){
                Object.assign(this.formItem,this.data);
            }
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        save () {
            this.$refs['tclxmodalForm'].validate(valid=>{
                if(valid){
                    this.btnLoading = true;
                    let params = {
                        name: this.formItem.name,
                        type_code: 'grouped_service',
                        department_id: this.formItem.department_id
                    };
                    let url = '/boss/category/create';
                    if(this.data&&this.data.id){
                        params.id = this.data.id;
                        url = '/boss/category/update';
                    }
                    this.$http.post(url,params).then(res=>{
                        this.btnLoading = false;
                        this.$Message.success(res.message);
                        this.modalState = false;
                        this.$emit('on-change');
                    })      
                }
            })
        },
        cancel () {
            this.modalState = false;
            this.$refs['tclxmodalForm'].resetFields();
        }
    }
}
</script>

<style>

</style>
