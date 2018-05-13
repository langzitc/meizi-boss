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
                <FormItem label="套餐编号" prop="sku">
                    <Input placeholder="套餐编号" v-model="formItem.sku" type="text" style="width:200px"></Input>              
                </FormItem>
                <FormItem label="套餐名称" prop="name">
                    <Input placeholder="套餐名称" v-model="formItem.name" type="text" style="width:200px"></Input>                
                </FormItem> 
                <FormItem label="套餐类型" prop="category_ids">
                    <Select placeholder="选择套餐类型" v-model="formItem.category_ids" style="width:200px">
                        <Option-group v-if="groupedServiceTypeList.length>0"  :label="el.name" v-for="el in groupedServiceTypeList" :key="el.id">
                            <i-option v-if="el.children" :value="el2.id" v-for="el2 in el.children" :key="el2.id">{{ el2.name }}</i-option>
                        </Option-group>                           
                    </Select>               
                </FormItem>                                
                <FormItem label="开始日期" prop="start_at">
                    <DatePicker v-model="formItem.start_at" type="date" placeholder="选择日期" style="width:200px"></DatePicker>
                </FormItem>   
                <FormItem label="结束日期" prop="expired_at">
                    <DatePicker v-model="formItem.expired_at" type="date" placeholder="选择日期" style="width:200px"></DatePicker>
                </FormItem>   
                <FormItem label="有效期" prop="term_of_validity">
                    <Input v-model="formItem.term_of_validity" placeholder="有效期" style="width:200px">
                        <span slot="append">月</span>
                    </Input>
                </FormItem>  
                <FormItem label="服务项目" style="width: 100%">
                    <table class="table table-bordered lctcmodaltable">
                        <thead>
                            <tr>
                                <th>项目</th>
                                <th>原价</th>
                                <th>次数</th>
                                <th>金额</th>
                                <th>
                                    <Button type="info" size="small" icon="android-add" @click="cadd"></Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(el,index) in formItem.grouped_service" :key="index" v-if="formItem.grouped_service.length">
                                <td>
                                    <!-- <Select @on-change="mutiSelectChange(el)" :transfer="true" v-model="el.product_id" placeholder="选择服务项目" filterable>
                                        <Option :disabled="item.disabled" v-for="item in serviceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                    </Select>                                     -->
                                    <Cascader change-on-select @on-change="mutiSelectChange(el)" placeholder="选择服务项目" :transfer="true" :data="formatServiceList" v-model="el.product_ids">
                                        <Button type="ghost" size="small" :icon="el.name ? 'android-checkmark-circle' : 'android-add'" long>{{selectFwxm(el)}}</Button>
                                    </Cascader>
                                </td>
                                <td>{{el.origin_price}}</td>
                                <td><InputNumber v-model="el.qty" :min="0" :step="1"></InputNumber></td>
                                <td><Input type="text" v-model="el.price"></Input></td>
                                <td>
                                    <Button type="primary" size="small" icon="android-remove" @click="creduce(index)"></Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </FormItem>   
                <FormItem label="套餐价值">
                     <span class="text-amount">{{tcjz}}</span>元<span class="text-muted" style="margin-left:20px">根据原价计算</span>
                </FormItem>  
                <FormItem label="套餐价格">
                      <span class="text-amount">{{tcjg}}</span>元<span class="text-muted" style="margin-left:20px">实际销售价格</span>
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
            </Form>
            <div class="part-loading" v-show="loading">
                <Spin fix>
                    <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                    <div>加载中</div>
                </Spin>			
            </div>            
        </Modal>           
    </span>      
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'add-lctc-modal',
    data () {
        return {
            modalState: false,
            btnLoading: false,   
            attributesData: [],//定价数据项 
            serviceList: [],       
            formItem: {
                type_code: 'grouped_service',
                sku: '',
                name: '',
                store_ids: [],
                expired_at: '',
                category_ids: '',
                start_at: '',
                term_of_validity: '12',
                grouped_service: [{
                    qty: 1,
                    price: '',
                    origin_price: '',
                    sku: '',
                    name: '',
                    product_id: '',
                    product_ids: [],
                    id: '',
                    attributes: {}
                }]
            },
            rules: {
                name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
                sku: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
                start_at: [{required: true,type: 'date', message: '开始日期不能为空', trigger: 'change' }],
                expired_at: [{required: true, type: 'date',message: '结束日期不能为空', trigger: 'change' }],
                category_ids: [{required: true,message: '套餐类型不能为空', trigger: 'change' }],
                store_ids: [],
                term_of_validity: [{required: true, type: 'string',message: '有效期不能为空', trigger: 'blur' }]
            },
            storeList: []
        }
    },
    computed: {   
        loading () {
            return this.$store.state.user.request > 0;
        },
        tcjz () {
            let n = 0;
            this.formItem.grouped_service.forEach(e=>{
                n+=parseFloat(e.origin_price)||0;
            })
            return n.toFixed(2);
        }, 
        tcjg () {
            let n = 0;
            this.formItem.grouped_service.forEach(e=>{
                n+=parseFloat(e.price)||0;
            })
            return n.toFixed(2);
        },   
        formatServiceList () {
            let arr = [];
            this.serviceList.forEach(e=>{
                let obj = {};
                obj.label = e.name;
                obj.value = e.id;
                if(e.price_attributes_detail.length){
                    obj.children = [];
                    e.price_attributes_detail.forEach(e2=>{
                        let obj2 = {};
                        obj2.label = e2.label;
                        obj2.value = e2.id;
                        let code = e2.code;
                        obj2.children = [];
                        e.advanced_prices.forEach(e3=>{
                            let obj3 = {};
                            if(e3.attributes[code]){
                                obj3.label = e3.attributes[code].label;
                                obj3.value = {
                                    code,
                                    value: e3.attributes[code].value,
                                    price: e3.price
                                };
                            }
                            obj2.children.push(obj3);
                        });
                        obj.children.push(obj2);
                    })
                }
                arr.push(obj);
            })
            return arr;
        },      
        ...mapState({
            storeByGroupList: state => state.story.storeByGroupList,
            groupedServiceTypeList: state => state.story.groupedServiceTypeList
        })         
    },
    watch: {
        modalState (n,o){
            if(n){
                this.getServiceList();
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
                this.storeList.forEach(e=>{
                    e.stores.forEach(e2=>{
                        if(e2.checked){
                            e.checked = true;
                        }
                    })
                }) 
                if(this.id){
                    this.$http.get('/boss/product/getServicePriceAttribute',{
                        params: {
                            product_id: this.id
                        }
                    }).then(res=>{
                        this.attributesData = res.data;
                    })
                    this.$http.get('/boss/product/info',{
                        params: {
                            id: this.id
                        }
                    }).then(res=>{
                        Object.assign(this.formItem,res.data);
                        if(Array.isArray(this.formItem.category_ids)&&this.formItem.category_ids.length){
                            this.formItem.category_ids = this.formItem.category_ids[0];
                        } 
                        this.formItem.grouped_service.forEach(e=>{
                            e.qty = parseInt(e.qty);
                        })
                    })
                }
                this.$store.dispatch('GET_GROUPED_SERVICE_TYPE');              
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
            default: '编辑疗程套餐'
        },
        data: {
            type: Object
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        selectFwxm (el) {
            let arr = [];
            if(!el.name){
                arr.push('选择服务项目');
            }else{
                arr.push(el.name);
                let hasAttribute = false;
                this.formatServiceList.forEach(e=>{
                    if(e.value === el.product_id && e.children && e.children.length){
                        hasAttribute = true;
                    }
                })
                let code = '',value = '';
                for(let key in el.attributes){
                    code = key;
                    value = el.attributes[key];
                }                
                if(hasAttribute&&!(JSON.stringify(el.attributes) === "{}")&&el.attributes[code]){
                    this.attributesData.forEach(e=>{
                        if(e.attribute_code === code){
                            e.options.forEach(e2=>{
                                if(e2.children){
                                    e2.children.forEach(e3=>{
                                        if(e3.value === value){
                                            arr.push(e.label);
                                            arr.push(e3.label);                                        
                                        }                                        
                                    })
                                }
                                else{
                                    if(e2.value === value){
                                        arr.push(e.label);
                                        arr.push(e2.label);                                        
                                    }
                                }
                            })
                        }
                    })
                }
            }
            return arr.join('/');
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
            let flag = true;
            this.formItem.grouped_service.forEach(e=>{
                if(!e.product_id){
                    flag = false;
                }
            });
            if(!flag){
                this.$Message.error('套餐项目不能为空');
                return;                
            }
            this.$refs['fwxmmodalForm'].validate(valid=>{
                if(valid){
                    this.btnLoading = true;
                    this.formItem.start_at = this.formItem.start_at.Format('yyyy-MM-dd');
                    this.formItem.expired_at = this.formItem.expired_at.Format('yyyy-MM-dd');
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
        getServiceList () {
            let params = {
                type_code: "service"
            };
            this.$http.get("/boss/product/list",{params}).then((res)=>{
                let d = res.data.items; 
                d.forEach(e=>{
                    e.disabled = false;
                })
                this.serviceList = d;
            });            
        },
        mutiSelectChange (el){
            setTimeout(()=>{
                let ids = this.formItem.grouped_service.filter(e=>{
                    return e.product_ids.length>0;
                }).map(e=>{
                    return e.product_ids[0];
                })
                this.serviceList.forEach(e=>{
                    if(el.product_ids.length&&e.id === el.product_ids[0]){
                        el.name = e.name;
                        el.sku = e.sku;
                        el.price = e.price;
                        el.origin_price = e.origin_price;
                        el.product_id = e.id;
                        el.attributes = {};
                        if(el.product_ids.length === 3){
                            el.attributes[el.product_ids[2].code] = el.product_ids[2].value;
                            el.price = el.product_ids[2].price;
                            el.origin_price = el.product_ids[2].price;                            
                        }
                    }
                })
            },100)
        },
        cadd () {
            this.formItem.grouped_service.push({
                qty: 1,
                price: '',
                origin_price: '',
                sku: '',
                name: '',
                product_id: '',
                product_ids: [],
                id: '',
                attributes: {}                
            });
        },
        creduce (index) {
            this.formItem.grouped_service.splice(index,1);
        }
    }
}
</script>

<style scoped lang="less">
    .lctcmodaltable{
        tr>th,tr>td{
            text-align: center;
            vertical-align: middle;
        }
    }
</style>
