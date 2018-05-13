<template>
  <span @click="setting">
      <slot>
          <Button type="info" size="small">编辑</Button>
      </slot>
      <Modal
          v-model="modalState"
          ok-text="保存"
          class-name="modal-scroll"
          :loading="modalState"
          width="750"
          :mask-closable="false"
          :title="title">
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div>              
            <Form ref="serviceRSMForm" :label-width="100" label-position="left" v-if="modalState">
                <FormItem label="已选项目">
                    <Tag closable color="blue" v-for="el in ids" :key="el.id">{{el.name}}</Tag>
                </FormItem>
                <i-col :sm="12">
                    <FormItem label="会员散客">
                        <RadioGroup v-model="formItem.is_member_type_global" @on-change="dataInit">
                            <Radio :label="1">
                                统一设置
                            </Radio>
                            <Radio :label="0">
                                分开设置
                            </Radio>
                        </RadioGroup>                    
                    </FormItem>                     
                </i-col>  
                <i-col>
                    <Checkbox v-model="formItem.is_employee_type_global" style="margin-top: 8px" @on-change="dataInit">全部员工统一设置</Checkbox>
                </i-col>
                <table class="table table-bordered srsm-table" v-for="el in staffTypeList" :key="el.id" v-if="state_1">
                    <tr>
                        <td rowspan="5">{{el.name}}</td>
                        <td rowspan="2">指定</td>
                        <td>散客</td>
                        <td>
                            <RadioGroup v-model="formItem.items[0].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>会员</td>
                        <td>
                            <RadioGroup v-model="formItem.items[1].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                        
                        </td>
                    </tr>  
                    <tr>
                        <td rowspan="2">非指定</td>
                        <td>散客</td>
                        <td>
                            <RadioGroup v-model="formItem.items[2].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                        
                        </td>
                    </tr>    
                    <tr>
                        <td>会员</td>
                        <td>
                            <RadioGroup v-model="formItem.items[3].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[3].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[3].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[3].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[3].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                   
                                </Row>
                            </RadioGroup>                         
                        </td>
                    </tr>  
                    <tr>
                        <td>内创</td>
                        <td>拓客奖励</td>
                        <td>
                            <RadioGroup v-model="formItem.items[4].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[4].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[4].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[4].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[4].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                        
                        </td>
                    </tr>                                                                                            
                </table>  
                <table class="table table-bordered srsm-table" v-for="el in staffTypeList" :key="el.id" v-if="state_2">
                    <tr>
                        <td rowspan="3">{{el.name}}</td>
                        <td>指定</td>
                        <td>
                            <RadioGroup v-model="formItem.items[0].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>   
                        </td>
                    </tr> 
                    <tr>
                        <td>非指定</td>
                        <td>
                            <RadioGroup v-model="formItem.items[1].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                             
                        </td>
                    </tr>    
                    <tr>
                        <td>内创</td>
                        <td>
                            <RadioGroup v-model="formItem.items[2].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                             
                        </td>
                    </tr>                                                                                            
                </table>                 
                <table class="table table-bordered srsm-table" v-if="state_3">
                    <tr>
                        <td rowspan="5">全部员工</td>
                        <td rowspan="2">指定</td>
                        <td>散客</td>
                        <td>
                            <RadioGroup v-model="formItem.items[0].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>会员</td>
                        <td>
                            <RadioGroup v-model="formItem.items[1].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                        
                        </td>
                    </tr>  
                    <tr>
                        <td rowspan="2">非指定</td>
                        <td>散客</td>
                        <td>
                            <RadioGroup v-model="formItem.items[2].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                        
                        </td>
                    </tr>    
                    <tr>
                        <td>会员</td>
                        <td>
                            <RadioGroup v-model="formItem.items[3].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[3].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[3].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[3].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[3].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                   
                                </Row>
                            </RadioGroup>                         
                        </td>
                    </tr>  
                    <tr>
                        <td>内创</td>
                        <td>拓客奖励</td>
                        <td>
                            <RadioGroup v-model="formItem.items[4].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[4].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[4].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[4].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[4].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                        
                        </td>
                    </tr>                                                                                              
                </table>    
                <table class="table table-bordered srsm-table" v-if="state_4">
                    <tr>
                        <td rowspan="3">全部员工</td>
                        <td>指定</td>
                        <td>
                            <RadioGroup v-model="formItem.items[0].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[0].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[0].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>   
                        </td>
                    </tr> 
                    <tr>
                        <td>非指定</td>
                        <td>
                            <RadioGroup v-model="formItem.items[1].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[1].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[1].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                             
                        </td>
                    </tr>    
                    <tr>
                        <td>内创</td>
                        <td>
                            <RadioGroup v-model="formItem.items[2].commission_type">
                                <Row :gutter="15">
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 1">
                                        <span slot="prepend"><Radio :label="0" style="top: 5px">金额</Radio></span>
                                        <span slot="append">元</span>                             
                                    </Input>                                    
                                </i-col>
                                <i-col :xs="12">
                                    <Input v-model="formItem.items[2].commission_amount" type="text" style="width: 150px" :disabled="formItem.items[2].commission_type == 0">
                                        <span slot="prepend"><Radio :label="1" style="top: 5px">比例</Radio></span>
                                        <span slot="append">%</span>                                  
                                    </Input>
                                </i-col>                                    
                                </Row>
                            </RadioGroup>                             
                        </td>
                    </tr>                                                                                            
                </table>                                          
            </Form>
      </Modal>        
  </span>
</template>

<script>
export default {
    name: 'ServiceRoyaltySettingModal',
    data (){
         return {
             modalState: false,
             formItem: {
                 product_id: '',
                 store_id: 0,
                 root_job_title_id: 0,
                 is_employee_type_global: false,
                 is_member_type_global: 0,
                 items: []
             }
         }
    },
    props: {
        ids: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            default: '提成设置'
        },
        staffType: {
            type: Object,
            required: true
        },
        store_id: {
            type: Number,
            required: true
        }
    },
    computed: {
        staffTypeList (){
            if(this.staffType.children&&this.staffType.children.length){
                return this.staffType.children;
            }else{
                return [this.staffType];
            }
        },
        state_1 (){
            return this.formItem.is_member_type_global === 0 && !this.formItem.is_employee_type_global;
        },
        state_2 (){
            return this.formItem.is_member_type_global === 1 && !this.formItem.is_employee_type_global;
        },
        state_3 (){
            return this.formItem.is_member_type_global === 0 && this.formItem.is_employee_type_global;
        },
        state_4 (){
            return this.formItem.is_member_type_global === 1 && this.formItem.is_employee_type_global;
        }                  
    },
    watch: {
        modalState (n,o){
           if(n){
               this.dataInit();
           }
        },
        store_id (v){
            this.formItem.store_id = v;
        }
    },
    methods: {
        setting (){
            this.modalState = true;
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
            this.$http.post("/boss/employeeCommission/addAndUpdate",params).then(res=>{
                this.$Message.success(res.message);
                this.$emit("on-change");
                this.modalState = false;
            })
        },
        cancel () {
            this.modalState = false;
        },
        dataInit () {
            if(this.state_1){
                this.formItem.items = [];
                this.staffTypeList.map(e=>{
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        member_type: 1,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        member_type: 2,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        member_type: 1,
                        assigned_type: 2,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        member_type: 2,
                        assigned_type: 2,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        member_type: 3,
                        assigned_type: 3,
                        commission_type: 0,
                        commission_amount: 0
                    });                                                                                
                })
            }else if(this.state_2){
                this.formItem.items = [];
                this.staffTypeList.map(e=>{
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: e.id,
                        assigned_type: 3,
                        commission_type: 0,
                        commission_amount: 0
                    });                                                                               
                })
            }else if(this.state_3){
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        member_type: 1,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        member_type: 2,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        member_type: 1,
                        assigned_type: 2,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        member_type: 2,
                        assigned_type: 2,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        member_type: 3,
                        assigned_type: 3,
                        commission_type: 0,
                        commission_amount: 0
                    });                  
            }else if(this.state_4){
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        assigned_type: 1,
                        commission_type: 0,
                        commission_amount: 0
                    });
                    this.formItem.items.push({
                        employee_job_title_id: 0,
                        assigned_type: 3,
                        commission_type: 0,
                        commission_amount: 0
                    });                 
            }
        }
    }
}
</script>

<style scoped>
    .srsm-table td{
        padding: 7px 12px;
        border: 1px solid #ddd;
        text-align: center;
    }
</style>
