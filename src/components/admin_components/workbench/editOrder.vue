<template>
<span @click="modalShow">
    <slot>
        <Button :disabled="disabled" type="primary" size="small">修改</Button>
    </slot>
    <Modal
            title="订单修改"
            v-model="modalState"
            ok-text="确认"
            class-name="modal-scroll"
            :loading="modalState"
            width="850"
            :mask-closable="false"      
    >
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="save">保存</Button>
            </div> 
            <table class="table table-bordered table-condensed order-table">
                <thead>
                    <tr>
                        <th colspan="3">水单信息</th>
                        <th colspan="3">提成设置</th>
                    </tr>                    
                    <tr>
                        <th>水单编号</th>
                        <th>项目内容</th>
                        <th>原价</th>
                        <th width="145px">员工</th>
                        <th v-if="this.order.id&&this.order.order_type == 0">类型</th>
                        <th>提成</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="order.id" v-for="(el,index) in order.items" :key="el.id">
                        <td v-if="index===0" :rowspan="order.items.length">{{order.trans_number}}</td>                        
                        <td>{{el.product_name}}</td>
                        <td>{{el.origin_price}}</td>
                        <td :colspan="order.id&&order.order_type == 0 ? 3 : 2" width="600px">
                            <Row class="clearfix" v-for="(el2,i) in el.employees" :key="i" :gutter="5" style="margin: 5px 0">
                                <Col :xs="4">
                                    <Button v-if="i === el.employees.length-1" type="ghost" size="small" @click="addEmployee(el,true)" icon="android-add"></Button>
                                    <span v-else>&nbsp;</span>
                                </Col>
                                <Col :xs="order.id&&order.order_type == 0 ? 6 : 8">
                                    <Select
                                        v-model="el2.employee_id"
                                        placeholder="选择员工"
                                        :transfer="true"
                                        @on-change="getTc(el,el2)"
                                        class="edit-order-select"
                                        >
                                        <Option :disabled="isDisable(option.id,el2.employee_id,el)" v-for="(option, index) in employeeList" :value="option.id" :key="index" :label="option.name">
                                                <Row>
                                                    <i-col :xs="12">{{option.name}}</i-col>
                                                    <i-col :xs="12" class="text-right">{{option.employee_number}}</i-col>
                                                </Row>
                                        </Option>
                                    </Select>                                     
                                </Col>
                                <Col :xs="5" v-if="order.id&&order.order_type == 0">
                                        <Select v-model="el2.assigned_type" @on-change="getTc(el,el2)" :transfer="true">
                                            <Option value="1">指定</Option>
                                            <Option value="2">未指定</Option>
                                            <Option value="3">内创</Option>
                                        </Select>
                                </Col>
                                <Col :xs="order.id&&order.order_type == 0 ? 5 : 8">
                                    <Input v-model="el2.amount" readonly>
                                        <span slot="append">元</span>
                                    </Input>
                                </Col>                                 
                                <Col :xs="4">
                                    <Button v-if="i === el.employees.length-1" type="ghost" size="small" @click="addEmployee(el,false)" icon="android-remove"></Button>
                                    <span v-else>&nbsp;</span>
                                </Col>                                                                
                            </Row>
                        </td>
                    </tr>
                    <tr v-if="order.id">
                        <td colspan="6" align="center" v-if="!order.id">请选择订单</td>
                    </tr>
                </tbody>
            </table>    
    </Modal>
</span>
</template>

<script>
export default {
    name: 'edit-order',
    data () {
        return {
            modalState: false,
            order: {},
            employeeList: []
        }
    },
    props: {
        config: {
            type: Object,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        modalState (n,o) {
            if(n){
                this.order = JSON.parse(JSON.stringify(this.config));
                if(this.order.items){
                    this.order.items.map(e=>{
                        if(!e.employees.length){
                            let obj = {
                                employee_number: '',
                                employee_id: '',
                                amount: 0   
                            }
                            if(this.order.order_type == 0){
                                obj.assigned_type = '2';
                            }
                            e.employees = [obj];
                        }
                    })                    
                }
                this.$http.get("/boss/employee/list",{params: {
                    store_id: this.config.store_id
                }}).then(res=>{
                    this.employeeList = res.data.items;
                });
                document.body.className = 'edit-order-select';
            }else{
                this.order = {};
                document.body.className = '';
            }
        }
    },
    methods: {
        modalShow () {
            this.modalState = true;
        },
        isDisable (id,value,row) {
            if(value === id){
                return false;
            }
            let set = new Set();
            row.employees.forEach(e2=>{
                set.add(e2.employee_id);
            })
            let arr = Array.from(set);
            return arr.includes(id);
        },
        cancel () {
            this.modalState = false;
        },
        save () {
            this.$Spin.show();
            this.$http.post("/boss/order/updateEmployee",this.order).then(res=>{
                this.$Spin.hide();
                this.$Message.success(res.message);
                this.$emit('on-change');
            }).catch((res)=>{
                this.$Message.success(res.message);
            });
        },
        getTc (el,el2) {
            let params = {
                product_id: el.product_id,
                employee_id: el2.employee_id,
                store_id: this.order.store_id,
                assigned_type: el2.assigned_type,
                price: el.price,
                member_type: this.order.member_type,
                member_card_operation: this.order.member_card_operation||""                
            };
            this.$http.post("/boss/order/calcEmployeeCommission",params).then(res=>{
                el2.amount = res.data.amount;
            })
        },
        addEmployee (el,type) {
            if(type){
                let obj = {
                    employee_number: '',
                    employee_id: '',
                    amount: 0                       
                }
                if(this.order.order_type == 0){
                    obj.assigned_type = '2';
                }
                el.employees.push(obj);
            }else{
                if(el.employees.length>1){
                    el.employees.pop();
                }
            }
        }
    }
}
</script>

<style lang="less">
    .order-table thead tr th{
        background-color: #d9edf7;
    }
    .order-table td,.order-table th{
        text-align: center;
    }
    .table.order-table > tbody > tr > td{
        vertical-align: middle;
    }        
    .edit-order-select{
        .ivu-select-dropdown[style]{
            width: 200px !important;
        }          
    }
</style>
