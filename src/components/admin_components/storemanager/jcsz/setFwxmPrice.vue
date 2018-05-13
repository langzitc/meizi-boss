<template>
    <span @click="showModal">
        <slot>
            <Button type="primary" size="small">定价</Button> 
        </slot>
        <Modal
            title="定价"
            v-model="modalState"
            class-name="modal-scroll"
            :loading="modalState"
            width="750"
            :mask-closable="false"            
        >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" :loading="btnLoading" size="large" @click="save">确认</Button>
            </div> 
            <Form :label-width="120">
                <FormItem label="已选服务项目">
                    <Tag type="border" color="blue">{{data.name}}</Tag>   
                </FormItem>    
                <FormItem label="选择定价属性">
                    <Radio-group v-model="formItem.price_attributes" @on-change="priceTypeChange">
                        <Radio label="0">统一设置</Radio>
                        <Radio :label="el.id" v-for="el in guigeList" :key="el.id">{{el.label}}</Radio>
                    </Radio-group>
                    <p class="text-muted">
                        服务项目定价时，可根据规格设置不同的价格。例如：选择造型师级别规格，即可根据造型师级别自定义不同的服务价格。                        
                    </p>
                </FormItem>   
                <FormItem label="定价">
                    <div v-for="el in priceItems" :key="el.id">
                        <Input type="text" v-model="el.price" style="width: 300px;margin-bottom:20px">
                            <div slot="prepend" style="width:100px;height:21px;line-height:21px" class="text-left"> 
                                <Checkbox v-model="el.checked">{{el.label}}</Checkbox>
                            </div>
                            <span slot="append">元</span>
                        </Input>
                    </div>
                </FormItem>                                                                                          
            </Form>
        </Modal>           
    </span>      
</template>

<script>
import { mapState } from 'vuex'
import ProductAdvancedPrice from "../../../../model/ProductAdvancedPrice";
export default {
    name: 'set-fwxm-price',
    data () {
        return {
            modalState: false,
            btnLoading: false,            
            storeList: [],
            priceItems: [],
            formItem: {
                price_attributes: '0'
            }
        }
    },
    computed: {       
        ...mapState({
            serviceTypeList: state => state.story.serviceTypeList,
            guigeList: state => state.story.guigeList,
            storeByGroupList: state => state.story.storeByGroupList
        })         
    },
    watch: {
        modalState (n,o){
            if(n){
                this.$store.dispatch('GET_GUI_GE',this.data.id).then(e=>{
                    let v = this.data.price_attributes ? this.data.price_attributes[0] : '0';
                    this.formItem.price_attributes = v;
                    this.priceTypeChange(v);
                });
            }else{
                this.cancel();
            }
        }
    },
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        priceTypeChange (v) {
            let obj = [];
            if(v == 0){
                obj.push({
                    price: this.data.price,
                    checked: true,
                    label: '统一设置'
                });
            }else{
                let a;
                this.guigeList.forEach(e=>{
                    if(e.id === v){
                        a = e; 
                    }
                }) 
                if(a){
                    let arr = [];
                    a.options.forEach(e=>{
                        if(e.children){
                            e.children.forEach(e2=>{
                                let obj2 = {
                                    label: e2.label,
                                    price: 0,
                                    checked: true,
                                    attributes: {}
                                };

                                let o = this.data.advanced_prices.filter(s=>{
                                    return s.attributes[a.attribute_code] == e2.value;
                                })

                                if(this.data.advanced_prices.length&&o.length){
                                    obj2.price = o[0].price;
                                }

                                let selectedAttributes = {}
                                selectedAttributes[a["attribute_code"]] = e2.value;
                                let price = ProductAdvancedPrice.getPriceForAttribute(this.data.advanced_prices, selectedAttributes);
                                obj2.price = price;
                                obj2.checked = true;
                                obj2.attributes[a.attribute_code] = e2.value;
                                arr.push(obj2);
                            })
                        }else{
                            let obj3 = {
                                label: e.label,
                                price: 0,
                                checked: true,
                                attributes: {}
                            };


                            let selectedAttributes = {}
                            selectedAttributes[a["attribute_code"]] = e.value;
                            let price = ProductAdvancedPrice.getPriceForAttribute(this.data.advanced_prices, selectedAttributes);
                            obj3.price = price;
                            if(obj3.price||this.data.advanced_prices.length === 0){
                                obj3.checked = true;
                            }else{
                                obj3.checked = false;
                            }
                            let o = this.data.advanced_prices.filter(s=>{
                                return s.attributes[a.attribute_code] == e.value;
                            })

                            obj3.attributes[a.attribute_code] = e.value;
                            arr.push(obj3);                            
                        }
                    })
                    obj = arr;
                }             
            }
            this.priceItems = obj;  
        },
        save () {
            let params = {
                id: this.data.id,
                price_attributes: this.formItem.price_attributes
            };
            if(this.formItem.price_attributes == 0){
                params.price = this.priceItems[0].price;
                params.advanced_price = [];
            }else{
                let advanced_price = [];
                this.priceItems.forEach(e=>{
                    if(e.checked){
                        advanced_price.push({
                            price: e.price,
                            attributes: e.attributes
                        });                        
                    }
                })
                params.advanced_price = advanced_price;
            }
            this.btnLoading = true;
            this.$http.post('/boss/product/update',params).then(res=>{
                this.btnLoading = false;
                this.modalState = false;
                this.$emit('on-change');
                this.$Message.success(res.message);
            }).catch(e=>{
                this.btnLoading = false;
            })
        },
        cancel () {
            this.modalState = false;
        }                   
    }
}
</script>

<style>

</style>

