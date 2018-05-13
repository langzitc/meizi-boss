<template>
    <span @click="showModal">
        <slot>
            <Button type="info" size="small">批量设置项目适用门店</Button> 
        </slot>
        <Modal
            title="批量设置适用门店"
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
            <Form :label-width="120">
                <FormItem label="已选服务项目">
                    <Tag type="border" @on-close="removeService(index)" closable color="blue" v-for="(el,index) in selectFwxm" :key="el.id">{{el.name}}</Tag>   
                </FormItem>   
                <FormItem label="适用门店">
                    <div>
                        <Checkbox v-model="isCheckAll" @on-change="selectAllStore">全选</Checkbox>
                    </div>
                    <div v-for="el in storeList" :key="el.id" style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <div>
                            <Checkbox v-model="el.checked" @on-change="storeSelect(el)">{{el.name}}</Checkbox>
                        </div>
                        <div>
                            <Checkbox v-model="el2.checked" v-for="el2 in el.stores" @on-change="storeSelect(el,el2)" :key="el2.id">{{el2.name}}</Checkbox>
                        </div>                       
                    </div>
                </FormItem>                                                                       
            </Form>
        </Modal>           
    </span>      
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'set-fwxm-store',
    data () {
        return {
            modalState: false,
            btnLoading: false,
            storeList: [],
            isCheckAll: false,
            selectFwxm: []
        }
    },
    computed: {       
        ...mapState({
            storeByGroupList: state => state.story.storeByGroupList
        })         
    },
    watch: {
        modalState (n,o){
            if(n){
                this.selectFwxm = this.rows;
                let arr = JSON.parse(JSON.stringify(this.storeByGroupList));  
                let format = (arrs,isChild = false)=>{
                    arrs.forEach(e=>{
                        e.checked = false;
                        if(isChild&&this.id){
                            let ids = this.data.stores.map(item=>{
                                return item.id;
                            })
                            if(ids.includes(e.id)){
                                e.checked = true;
                            }
                        }
                        if(e.stores){
                            e.stores = format(e.stores,true);
                        }
                    })  
                    return arrs;                 
                }
                this.storeList = format(arr);
            }else{
                this.cancel();
            }
        }
    },
    props: {
        rows: {
            type: Array
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        save () {
            let store_ids = [];
            let product_ids = this.selectFwxm.map(e=>{
                return e.id
            });
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
            this.btnLoading = true;
            let params = {
                store_ids,
                product_ids
            };
            this.$http.post('/boss/product/assignProductsToStores',params).then(res=>{
                this.btnLoading = false;
                this.$Message.success(res.message);
                this.modalState = false;
                this.$emit('on-change');
            }).catch(e=>{
                this.btnLoading = false;
            })  
        },
        cancel () {
            this.modalState = false;
        },
        removeService (index){
            if(this.selectFwxm.length>1){
                let arr = this.selectFwxm.filter((e,i)=>{
                    return index!==i;
                }).map(e=>{
                    return e.id;
                })
                this.selectFwxm.splice(index,1);
                this.$emit('select-change',arr);                
            }else{
                this.$Message.warning('至少选择一个服务项目');
            }
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
        },
        selectAllStore (state) {
            let flag = state;
            this.storeList.forEach(e=>{
                e.checked = flag;
                e.stores.forEach(e2=>{
                    e2.checked = flag;
                })
            })            
        }                      
    }
}
</script>

<style>

</style>

