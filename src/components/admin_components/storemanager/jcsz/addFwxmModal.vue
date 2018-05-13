<template>
    <span @click="showModal">
        <slot>
            <Button type="info" size="small">编辑</Button> 
        </slot>
        <Modal
            :title="title"
            v-model="modalState"
            class-name="modal-scroll"
            :loading="modalState"
            width="750"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" :loading="btnLoading" size="large" @click="save">保存</Button>
            </div> 
            <Form :label-width="120" ref="fwxmmodalForm" :model="formItem" :rules="rules">
                <FormItem label="项目名称" prop="name">
                    <Input placeholder="项目名称" v-model="formItem.name" type="text" style="width:200px"></Input>
                    <p class="text-muted">
                        服务项目即本店所能为顾客提供的各类服务，可以为“洗头”“剪发”“烫发”或者按照耗材品牌进行设置。
                    </p>                    
                </FormItem>
                <FormItem label="项目编号" prop="sku">
                    <Input placeholder="项目编号" v-model="formItem.sku" type="text" style="width:200px"></Input>                
                </FormItem>                
                <FormItem label="项目类型" prop="category_ids">
                    <Select placeholder="选择项目类型" v-model="formItem.category_ids" style="width:200px">
                        <Option-group v-if="serviceTypeList.length>0"  :label="el.name" v-for="el in serviceTypeList" :key="el.id">
                            <i-option v-if="el.children" :value="el2.id" v-for="el2 in el.children" :key="el2.id">{{ el2.name }}</i-option>
                        </Option-group>                        
                    </Select>
                </FormItem>   
                <FormItem label="适用门店" prop="store_ids">
                    <div v-for="el in storeList" :key="el.id" style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <div>
                            <Checkbox v-model="el.checked" @on-change="storeSelect(el)">{{el.name}}</Checkbox>
                        </div>
                        <div>
                            <Checkbox v-model="el2.checked" v-for="el2 in el.stores" @on-change="storeSelect(el,el2)" :key="el2.id">{{el2.name}}</Checkbox>
                        </div>                       
                    </div>
                </FormItem>   
                <FormItem label="项目图片" prop="imgages">
                    <Upload
                        style="width:150px;height:150px"
                        type="drag"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :data="uploadParams"                  
                        :action="uploadURL">
                        <div style="padding: 10px 0" v-show="!filePath">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或者拖拽上传图片</p>
                        </div>
                        <div style="padding: 10px 0" v-show="filePath">
                            <img :src="filePath" alt="" style="width: 110px;height:110px">
                        </div>                  
                    </Upload>
                    <p class="text-muted">
                        添加服务项目图片，用于移动端展示，寸为600*600px。
                    </p>                      
                </FormItem>                                                            
            </Form>
        </Modal>           
    </span>      
</template>

<script>
import { mapState } from 'vuex'
import { skuValidate } from '../../../../util/validate'
export default {
    name: 'add-fwxm-modal',
    data () {
        return {
            modalState: false,
            btnLoading: false,
            filePath: '',            
            formItem: {
                type_code: 'service',
                sku: '',
                name: '',
                images: '',
                category_ids: '',
                store_ids: [],
                advanced_price: []
            },
            rules: {
                name: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
                sku: [
                    { required: true, message: '项目编号不能为空', trigger: 'blur' },
                    { validator: skuValidate, trigger: 'blur' }
                ],
                category_ids: [{ required: true, message: '请选择类型', trigger: 'change' }],
                images: [],
                store_ids: []
            },
            storeList: []
        }
    },
    computed: {
        uploadURL (){
            return `${API_PATH}/store/upload`;
        },
        uploadParams (){
            return {sid: this.$store.state.user.sid};
        },        
        ...mapState({
            serviceTypeList: state => state.story.serviceTypeList,
            storeByGroupList: state => state.story.storeByGroupList
        })         
    },
    watch: {
        modalState (n,o){
            if(n){
                let arr = JSON.parse(JSON.stringify(this.storeByGroupList));  
                let format = (arrs,isChild = false)=>{
                    arrs.forEach(e=>{
                        if(isChild&&this.id){
                            let ids = this.data.stores.map(item=>{
                                return item.id;
                            })
                            e.checked = ids.includes(e.id); 
                        }else if(this.id){
                            let ids2 = e.stores.map(item=>{
                                return item.id;
                            })
                            let ids = this.data.stores.map(item=>{
                                return item.id;
                            })
                            let flag = false;
                            ids2.forEach(g=>{
                                if(ids.includes(g)){
                                    flag = true;
                                }
                            })                            
                            e.checked = flag;                       
                        }else{
                            e.checked = false;
                        }
                        if(e.stores){
                            e.stores = format(e.stores,true);
                        }
                    })  
                    return arrs;                 
                }
                this.storeList = format(arr);
                if(this.id){
                    this.filePath = this.data.image_url;
                    this.formItem.images = this.data.image_path;
                    this.formItem.sku = this.data.sku;
                    this.formItem.name = this.data.name;
                    this.formItem.category_ids = this.data.category_ids[0];
                    this.formItem.advanced_price = this.data.advanced_price;
                }
            }else{
                this.cancel();
            }
        }
    },
    props: {
        id: {
            type: Number
        },
        title: {
            type: String,
            default: '编辑服务项目'
        },
        data: {
            type: Object
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        save () {
            let store_ids = [];
            this.storeList.forEach(e=>{
                e.stores.map(e2=>{
                    if(e2.checked){
                        store_ids.push(e2.id); 
                    }
                });
            });
            if(!store_ids.length){
                this.$Message.error('请选择适用门店');
                return;
            }
            this.$refs['fwxmmodalForm'].validate(valid=>{
                if(valid){
                    this.btnLoading = true;
                    let params = JSON.parse(JSON.stringify(this.formItem));
                    params.store_ids = store_ids;
                    let url = "/boss/product/create";
                    if(this.id){
                        params.id = this.id;
                        url = '/boss/product/update';
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
            this.$refs['fwxmmodalForm'].resetFields();
            this.filePath = "";
        },
        handleSuccess (res, file) {
            this.filePath = res.data.file.full_url;
            this.formItem.images = res.data.file.path;
        },
        handleError () {
            this.$Message.error("图片上传失败");
        },
        handleFormatError (file) {
            this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: '文件 ' + file.name + ' 格式错误, 请上传 jpg 或者 png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: '文件  ' + file.name + ' 不能超过2M'
            });
        },  
        storeSelect (el,el2) {
            if(el2){
                let flag = false;
                el.stores.forEach(e=>{
                    if(e.checked){
                        flag = true;
                    }
                })
                el.checked = flag;
            }else{
                el.stores.forEach(e=>{
                    e.checked = el.checked;
                })
            }
        }              
    }
}
</script>

<style>

</style>
