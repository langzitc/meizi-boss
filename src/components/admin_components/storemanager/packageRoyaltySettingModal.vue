<template>
    <span @click="showModal">
        <slot>
            <Button type="info" size="small">编辑</Button> 
        </slot>
        <Modal
            title="设置提成"
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
            <Form ref="serviceRSMForm" :label-width="100" label-position="left" v-if="modalState">
                <FormItem label="已选套餐">
                    <Tag color="yellow" v-for="el in ids" :key="el.id">{{el.name}}</Tag>
                </FormItem>
                <FormItem label="提成模式">
                    <RadioGroup v-model="typeCard.commission_type">
                        <Row :gutter="15">
                        <i-col :xs="12">
                            <Input v-show="typeCard.commission_type == 0" v-model="typeCard.commission_amount" type="text" style="width: 150px">
                                <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                <span slot="append">元</span>                             
                            </Input> 
                            <Input v-show="typeCard.commission_type == 1" type="text" style="width: 150px" :disabled="typeCard.commission_type == 1">
                                <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                <span slot="append">元</span>                             
                            </Input>                                                                
                        </i-col>
                        <i-col :xs="12">
                            <Input v-model="typeCard.commission_amount" type="text" style="width: 150px" v-show="typeCard.commission_type == 1">
                                <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                <span slot="append">%</span>                                  
                            </Input>
                            <Input v-show="typeCard.commission_type == 0" type="text" style="width: 150px" :disabled="typeCard.commission_type == 0">
                                <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                <span slot="append">%</span>                                  
                            </Input>                            
                        </i-col>                                    
                        </Row>
                    </RadioGroup>
                </FormItem>                               
            </Form>                
        </Modal>
    </span>
</template>

<script>
export default {
    name: 'PackageRoyaltySettingModal',
    data (){
        return {
            modalState: false,
            formItem: {
                product_id: '',
                store_id: 0,
                items: []
            },
            typeCard: {
                id: 0,
                commission_type: 0,
                commission_amount: 0
            }                        
        }
    },
    methods: {
        showModal () {
            this.modalState = true;
        },
        cancel () {
            this.modalState = false;
        },
        save () {
            let params = JSON.parse(JSON.stringify(this.formItem));
            if(!params.product_id){
                let ids = [];
                this.ids.map(e=>{
                    ids.push(e.id);
                })
                params.product_id = ids.join(",");
            }
            params.store_id = this.store_id;
            params.items.push(JSON.parse(JSON.stringify(this.typeCard)));
            this.$http.post("/boss/employeeCommission/addAndUpdate",params).then(res=>{
                this.$Message.success(res.message);
                this.$emit("on-change");
                this.modalState = false;
            })
        }
    },
    watch: {
        modalState (n,o){
            if(n){
                if(this.ids.length==1){
                    let d = this.ids[0];
                    let commission = d.commission[0];
                    if(commission&&commission.items.length){
                        commission.items.map(e=>{
                            Object.assign(this.typeCard,e);
                        })
                    }
                }             
            }
        }
    },    
    props: {
        ids: {
            type: Array,
            required: true
        },
        store_id: {
            type: Number,
            required: true
        }
    }   
}
</script>

<style>

</style>
