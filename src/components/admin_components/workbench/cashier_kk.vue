<template>
  <div>
      <div class="table-wrap">
            <table class="table table-bordered table-condensed kk-table">
                <thead>
                    <tr class="info">
                    <th>会员</th>
                    <th>会员卡编号</th>
                    <th>卡项</th>
                    <th>充值额度</th>
                    <th>赠送金</th>                        
                    <th width="300px">
                        销售员工
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="member.id&&!member.card.id">
                        <td>{{formItem.member_name||formItem.customer_name}}</td>
                        <td><Input type="text" v-model="formItem.items[0].sku"></Input></td>
                        <td>
                            <Select @on-change="cardChange" placement="top" :transfer="true" placeholder="选择卡项" v-model="formItem.items[0].product_id">
                                <Option v-for="el2 in cardList" :key="el2.id" :value="el2.id">{{el2.name}}</Option>
                            </Select>
                        </td>
                        <td><InputNumber :min="minCardAmount" v-model="formItem.items[0].origin_price"></InputNumber></td>
                        <td><InputNumber :min="minGivenAmount" v-model="formItem.items[0].price" ></InputNumber></td>
                        <td class="ico-table-td">
                            <i-col :xs="2" class="text-center">
                                <Button type="text" @click="addEmployeeItem(formItem)" icon="android-add"></Button>
                            </i-col>
                            <i-col :xs="20">
                                <Row v-for="(el2,index2) in formItem.items[0].employees" :key="index2" :gutter="22" style="margin: 5px 0">
                                    <i-col :xs="24" class="text-center">
                                        <Select
                                            v-model="el2.employee_id"
                                            placeholder="选择员工"
                                            @on-change="employeeChange(formItem,el2)"
                                            placement="top" 
                                            :transfer="true"
                                            >
                                            <Option :disabled="isDisable(option.id,el2.employee_id)" v-for="(option, index) in employeeList" :value="option.id" :key="index" :label="option.employee_number">
                                               <!-- <span style="margin-right: 20px">{{option.name}}</span>
                                                <span>{{option.mobile}}</span>
                                                -->
                                                {{option.name}}
                                            </Option>
                                        </Select>                                   
                                    </i-col>                                 
                                </Row> 
                            </i-col>
                            <i-col :xs="2" class="text-center">
                                <Button type="text" @click="reduceEmployeeItem(formItem)" icon="android-remove"></Button>
                            </i-col>
                        </td>                       
                    </tr>
                    <tr v-if="!member.id">
                        <td colspan="9" class="text-warning">请选择会员</td>
                    </tr>   
                    <tr v-if="member.id&&member.card.id">
                        <td colspan="9" class="text-warning">已开卡</td>
                    </tr>                       
                </tbody>
            </table>            
      </div>
            <Form ref="cashier-kk" :label-width="100" style="margin: 50px auto;width: 500px">
                <FormItem label="消费金额">
                        <span class="text-amount">{{amount}}</span>元
                </FormItem> 
                <FormItem label="实际应收">
                        <span class="text-amount">{{actual_amount}}</span>元
                </FormItem>                         
                <FormItem label="订单日期">
                        <Input readonly type="text" v-model="date"></Input>
                </FormItem>  
                <FormItem label="备注">
                        <Input  type="textarea" v-model="formItem.description"></Input>
                </FormItem>     
                <FormItem>
                        <Button type="primary" @click="checkOut('processing')" style="padding: 5px 22px">结账</Button>
                </FormItem>                                            
            </Form>  
            <div class="part-loading" v-show="loading">
                <Spin fix>
                    <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                    <div>加载中</div>
                </Spin>			
            </div>                 
  </div>
</template>

<script>
import util from '../../../util'
let _this = this;
export default {
    name: 'cashier-kk',
    data () {
        return {
            formItem: {
                description: '',
				        store_member_id: '',
				        order_type: 3,
				        member_type: 2,
				        member_name: '',
				        store_id: '',
				        amount: 0,
				        status: '',
				        items: [{
				            product_id: '',
				            sku: '',
				            price: 0,
				            origin_price: 0,
				            ordered_qty: 1,
				            employees: [{
				                employee_number: '',
				                employee_id: '',
				                // assigned_type: 1,
				                amount: 0
				            }]            
				        }],
				        payment_methods: []                
            },
            employeeList: []              
        }
    },
    props: {
        cardList: {
            type: Array,
            required: true
        },
        order: {
        		type: Object
        },        
        member: {
        	type: Object,
        	required: true
        }
    },    
    computed: {
        minGivenAmount () {
            let n = 0;
            let data = this.cardList.filter(e=>{
                return e.id === this.formItem.items[0].product_id;
            })
            if(data.length){
                n = parseInt(data[0].given_amount);                       
            }   
            return n;
        },
        minCardAmount () {
            let n = 0;
            let data = this.cardList.filter(e=>{
                return e.id === this.formItem.items[0].product_id;
            })
            if(data.length){
                n = parseInt(data[0].min_recharge_amount);                        
            }      
            return n;      
        },        
        actual_amount () {
            return parseFloat(this.formItem.items[0].origin_price);
        },
        amount () {
						return parseFloat(this.formItem.items[0].origin_price);
        },
        date () {
            return (new Date()).Format('yyyy-MM-dd');
        },
        store_id () {
        	return this.$store.state.story.store_id;
        },
        loading () {
            return this.$store.state.user.request !== 0;
        }          
    },
    watch: {
        member () {
            this.dataInit();
        },
        store_id () {
            this.dataInit();
        },
        order: {
            deep: true,
            handler: (n,o)=>{
                _this.dataInit();
            }
        }        
    },
    methods: {
        isDisable (id,value) {
            if(value === id){
                return false;
            }
            let set = new Set();
            if(this.formItem.items){
                this.formItem.items.forEach(e=>{
                    e.employees.forEach(e2=>{
                        set.add(e2.employee_id);
                    })
                })                
            }
            let arr = Array.from(set);
            return arr.includes(id);
        },  
        cardChange (id) {
            let data = this.cardList.filter(e=>{
                return e.id === id;
            })
            if(data.length){
                this.formItem.items[0].origin_price = data[0].min_recharge_amount;
                this.formItem.items[0].price = data[0].given_amount;
            }
        },      
        checkOut (state = 'processing') {
            let _this = this;
            if(this.member.id){
                this.$Modal.confirm({
                    title: '结算',
                    width: 750,
                    okText: '确认结账',
                    render: (h)=> {
                        let trarr = [];
                        let zxf = 0;
                        let dk = 0;
                        let e = _this.formItem;
                        zxf = zxf+parseFloat(e.items[0].origin_price);
                        dk = dk+parseFloat(e.items[0].price);
                        trarr.push(
                            h('tr',[
                                h('td',e.member_name),
                                h('td','会员卡开卡'),
                                h('td',e.items[0].origin_price),
                                h('td',e.items[0].price),
                                h('td',e.items[0].origin_price),
                                h('td',{
                                    on: {
                                        click (e){
                                            if(i>0){
                                                _this.formItem.splice(i,1);
                                            }
                                        }
                                    }
                                },'删除')
                            ])
                        );
                        return h('div',[
                            h('table',{
                                attrs: {
                                    class: 'table table-bordered'
                                }
                            },[
                                h('thead',[
                                    h('tr',[
                                        h('th','会员'),
                                        h('th','订单内容'),
                                        h('th','充值额度'),
                                        h('th','赠送金'),
                                        h('th','实付金额'),
                                        h('th','操作')
                                    ])
                                ]),
                                h('tbody',trarr)
                            ]),
                            h('p',{
                                attrs: {
                                    class: 'text-right'
                                }
                            },[
                                h('span',"总消费:"),
                                h('span',{
                                    attrs: {
                                        class: 'text-amount'
                                    }
                                },`${zxf}元`),
                                h('span',"赠送金:"),
                                h('span',{
                                    attrs: {
                                        class: 'text-amount'
                                    }                                
                                },`${dk}元`),
                                h('span',"应收金额:"),
                                h('span',{
                                    attrs: {
                                        class: 'text-amount'
                                    }                                
                                },`${zxf} 元`),
                            ])                        
                        ])
                    },
                    onOk: ()=> {
                        let params = JSON.parse(JSON.stringify(this.formItem));
                        params.status = state;
                        params.items.forEach(e=>{
                            e.employees = e.employees.filter(e2=>{
                            	return e2.employee_id !== '';
                            })
                        })    
                        params = util.clear(params);
                        this.$http.post("/boss/order/create",params).then(res=>{
                            switch(state){
                                case "pending": 
                                    this.$Notice.info({
                                        title: '系统通知',
                                        duration: 10,
                                        desc: '挂单成功！请在挂单列表中重新结算!'
                                    });
                                    this.dataInit();                                     
                                break;
                                default: 
                                    this.$router.push({
                                        name: 'cashier',
                                        query: {
                                            type: 'jiezhang',
                                            order_id: res.data.id
                                        }
                                    });                                    
                                break;
                            } 
                        });
                    }
                }); 
            }else{
                this.$Message.warning("请选择会员");
            }          
        },
        employeeChange (row,el2) {
            let employee = this.employeeList.filter(e=>{
                    return e.id === el2.employee_id;
            })
            el2.employee_number = employee[0].employee_number;    	
        },   
        addEmployeeItem (el) {
            el.items[0].employees.push({
                employee_number: '',
                employee_id: '',
                // assigned_type: 1,
                amount: 0                
            });
        },    
        reduceEmployeeItem (el) {
            el.items[0].employees.pop();
        },
        async dataInit (){
            let getEmployeeList = ()=>{
                return new Promise((resolve,reject)=>{
                    this.$http.get("/boss/employee/list",{
                        params: {
                            store_id: this.store_id
                        }
                    }).then(res=>{
                        resolve(res.data.items);
                    })                     
                })
            }
            if(!this.employeeList.length){
                this.employeeList = await getEmployeeList();
            }            
            if(this.order.id){
                Object.assign(this.formItem,this.order);
                if(!this.formItem.items[0].employees.length){
                    this.formItem.items[0].employees.push({
                        employee_number: '',
                        employee_id: '',
                        amount: 0                           
                    });
                }  
                this.formItem.items.forEach(e=>{
                  e.origin_price = parseFloat(e.origin_price)||0;
                  e.price = parseFloat(e.price)||0;  
                })                
            }else{
                if(this.member.id){
                    this.formItem.store_member_id = this.member.id;
                    this.formItem.member_name = this.member.name;
                }
                if(this.store_id){
                        this.formItem.store_id = this.store_id;
                }
            }
        }  
    },
    mounted () {
        _this = this;
        this.dataInit();
    }        
}
</script>

<style>
    .kk-table{
        overflow: scroll;
    }
    .kk-table tr td,.kk-table tr th{
        text-align: center;
        vertical-align: middle!important;
        font-size: 12px;
    }
    .kk-table thead th{
        color: #333;
    }
    .ico-table-td{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
    }
</style>
