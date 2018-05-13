<template>
    <div>
        <div class="table-wrap">
            <table class="table table-bordered table-condensed kk-table">
                <thead>
                    <tr class="info">
                        <th width="50px"></th>
                        <th width="200px">套餐编号</th>
                        <th width="150px">套餐名称</th>
                        <th>原价</th>
                        <th>售价</th>
                        <th width="300px">销售员工</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="active" v-for="(row,rindex) in formItem.items" :key="rindex">
                        <td>
                            <Button icon="android-remove" @click="reduceRow(rindex)" size="small" type="ghost"></Button>
                        </td>
                        <td>
                            <Dropdown transfer placement="bottom-start" trigger="click">
                                <span>
                                    <Input type="text" v-model="row.sku" placeholder="选择套餐"></Input>
                                </span>
                                <Alert slot="list" type="info" style="max-width:800px;min-width:400px">
                                    <p class="text-muted text-center" v-show="!serviceList.length">无数据</p>
                                    <Form :label-width="100" label-position="left">
                                        <FormItem label="已订购套餐" style="margin-bottom:0" v-if="groupServiceList.length">
                                            <RadioGroup>
                                                <Radio label="金斑蝶"></Radio>
                                            </RadioGroup>
                                        </FormItem>
                                        <FormItem v-for="service in serviceList" :label="service.name" :key="service.id" style="margin-bottom:0">
                                            <RadioGroup v-model="row.product_id" @on-change="fwxmSelectChange(row)" type="button" size="small">
                                                <Radio :label="ser.id" v-for="ser in service.children" :key="ser.id">(&nbsp;&nbsp;{{ser.sku}}&nbsp;&nbsp;)-{{ser.name}}</Radio>
                                            </RadioGroup>
                                        </FormItem>                                        
                                    </Form>
                                </Alert>
                            </Dropdown>                            
                        </td>
                        <td>
                            {{row.product_name}}
                        </td>
                        <td>{{row.origin_price}}</td>
                        <td>
                            {{row.price}}
                        </td>     
                        <td>
                            <i-col :xs="4" class="text-center">
                                <Button type="ghost" style="margin-top:5px" @click="addEmployeeItem(row)" icon="android-add"></Button>
                            </i-col>
                            <i-col :xs="16">
                                <Row :gutter="10" style="margin: 5px 0" v-for="(el2,index2) in row.employees" :key="index2">
                                    <i-col :xs="24">
                                    <Dropdown transfer placement="bottom" trigger="click" style="width:100%">
                                        <span>
                                            <Input type="text" v-model="el2.employee_name" placeholder="选择销售员工"></Input>
                                        </span>
                                        <Alert slot="list" type="warning" style="max-width:800px;min-height:400px">
                                            <p class="text-muted text-center" v-show="!employeeList.length">无数据</p>
                                            <Form :label-width="100" label-position="left">
                                                <FormItem v-for="employee in employeeList" :label="employee.name" :key="employee.id" style="margin-bottom:0">
                                                    <RadioGroup v-model="el2.employee_id" @on-change="fwygSelectChange(el2)" type="button" size="small">
                                                        <Radio :disabled="isDisable(sers.id,el2.employee_id,row)" style="margin: 0 10px 10px 0" :label="sers.id" v-for="sers in employee.children" :key="sers.id">{{sers.name}}</Radio>
                                                    </RadioGroup>
                                                </FormItem>                                        
                                            </Form>
                                        </Alert>
                                    </Dropdown>  
                                    </i-col>
                                    <!-- <i-col :xs="12">
                                        <Select :transfer="true" placement="top" v-model="el2.assigned_type">
                                            <Option :value="1">指定</Option>
                                            <Option :value="2">未指定</Option>
                                            <Option :value="3">内创</Option>
                                        </Select>
                                    </i-col>                                -->
                                </Row> 
                            </i-col>
                            <i-col :xs="4" class="text-center">
                                <Button type="ghost" style="margin-top:5px" @click="reduceEmployeeItem(row)" icon="android-remove"></Button>
                            </i-col>
                        </td>                          
                    </tr>
                </tbody>
            </table>
        </div>
        <Form ref="cashier-xmxf" :label-width="100" style="margin: 50px auto;width: 800px">
            <FormItem label="消费金额">
                    <span class="text-amount">{{amount}}</span>元
            </FormItem> 
            <FormItem label="抵扣">
                <i-col :xs="5">
                    <div class="input-number-wrap">
                        <InputNumber v-model="formItem.payment_methods[0].amount" :max="carMaxAmount" :min="0" :step="0.1"></InputNumber>
                        <div class="input-number-prepend">会员卡</div>
                    </div>
                </i-col>
                <i-col :xs="5" :offset="1">       
                    <div class="input-number-wrap">
                        <InputNumber v-model="formItem.payment_methods[1].amount" :max="zsjMaxAmount" :min="0" :step="0.1"></InputNumber>
                        <div class="input-number-prepend">赠送金</div>
                    </div>                                      
                </i-col>
                <i-col :xs="5" :offset="1">       
                    <div class="input-number-wrap">
                        <InputNumber v-model="formItem.payment_methods[2].amount" :min="0" :step="0.1"></InputNumber>
                        <div class="input-number-prepend">套餐卡</div>
                    </div>                                          
                </i-col>  
                <i-col :xs="5" :offset="1">
				    <Select v-model="formItem.payment_methods[3].coupon_id" clearable placeholder="使用现金券">
				    	<Option v-show="!coupon_cash.length" value="" disabled>无可用现金券</Option>
				        <Option v-for="item in coupon_cash" :value="item.id" :key="item.id">{{ item.title }}</Option>
				    </Select>                             
                </i-col>                  
            </FormItem> 
            <FormItem label="实际应收">
                    <span class="text-amount">{{actual_amount}}</span>元
            </FormItem>                                        
            <FormItem label="订单日期">
                    <Input readonly type="text" v-model="date" style="width:300px"></Input>
            </FormItem>  
            <FormItem label="备注">
                    <Input  type="textarea" v-model="formItem.description" style="width:300px"></Input>
            </FormItem>      
            <FormItem>
                    <Button type="primary" @click="checkOut('processing')" style="padding: 5px 22px">结账</Button>                 
                    <Button type="warning" @click="checkOut('pending')" style="display:none;padding: 5px 22px">挂单</Button>
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
import Cart from "../../../model/Cart"
let tableRow = ()=>{
    let cartItem = new Cart.CartInstance().newItem();
    return cartItem.data;
}
let _this;
export default {
    name: 'cashier-dglctc',
    data () {
        let cart = Cart.newCart();
        cart.setData("order_type","1");
        return {
            serviceList: [],
            cart: cart,
            groupServiceList: [],
            employeeList: [],
            formItem: cart.data
        }
    },
    props: {
        member: {
            type: Object,
            required: true
        },
        order: {
            type: Object
        },
        couponList: {
        	type: Array
        }
    },
    computed: {
        actual_amount () {
            let amount = this.cart.getToBeDeterminedAmount();
            return amount;
        },
        amount () {
            let num = 0;
            this.formItem.items.map(e=>{
                num+=parseFloat(e.price);
            })
            return num;
        },
        date () {
            if(this.order.id){
                return (new Date(this.order.updated_at)).Format('yyyy-MM-dd');
            }
            return (new Date()).Format('yyyy-MM-dd');
        },
        staffTypeList () {
        	return this.$store.state.story.staffTypeList;
        },
        store_id () {
        	return this.$store.state.story.store_id;
        },
        coupon_cash () {
        	return this.couponList.filter(e=>{
        		return e.discount_type == 0;
        	});
        },
        coupon_zk () {      	
        	return this.couponList.filter(e=>{
        		return e.discount_type == 1;
        	});        	
        },
        carMaxAmount () {
            let n = 0;
            if(this.member.card&&this.member.card.amount){
                n = parseFloat(parseFloat(this.member.card.amount).toFixed(2));
            }
            return n;
        },
        zsjMaxAmount () {
            let n = 0;
            if(this.member.card&&this.member.card.given_amount){
                n = parseFloat(parseFloat(this.member.card.given_amount).toFixed(2));
            }
            return n;            
        },
        isOrder () {
            return this.order&&this.order.id&&this.order.order_type == 1;
        },
        tableWidth () {
            let el = document.getElementsByTagName('table');
            let w = "400px";
            if(el.length){
                w = el[0].offsetWidth-10+'px';
            }
            return w;
        },
        loading () {
            return this.$store.state.user.request !== 0;
        }            
    },
    watch: {
    	member (n,o) {
    		this.dataInit2();
    	},
    	store_id (n,o) {
            this.dataInit();
    		this.dataInit2();
    	},
        order: {
            deep: true,
            handler(n,o){
                Object.assign(this.formItem,this.order);
                // this.formItem.items.forEach(e=>{
                //     e.employees.forEach(e2=>{
                //         e2.assigned_type = parseInt(e2.assigned_type);
                //     })
                // })                
            }
        }
    },
    methods: {   	
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
    	couponChange (row) {
            this.getPrice(row).then(data=>{
                row.origin_price = data.origin_price;
                row.price = parseFloat(data.final_price).toFixed(2);
                this.amountInit();
            })
    	},
        getPrice (row) {
            return new Promise((resolve,reject)=>{
                let params = {
                    product_id: row.product_id,
                    store_member_id: this.member.id,
                    customer_ordered_grouped_service_item_id: row.ordered_grouped_service_item_id,
                    employee_id: ''
                };
                this.$http.get("/boss/order/calcProductPrice",{params}).then(res=>{
                    resolve(res.data);
                })
            });
        },   	
        addItem (){
                this.cart.newItem();
        },
        removeItem () {
            if(this.formItem.items.length>1){
            	this.formItem.items.pop();
            }
        },
        dataInit () {
        	if(this.store_id){
                this.$http.get("/boss/employee/list",{
                    params: {
                        store_id: this.store_id,
                        is_grouped_by_job_title_level1: 1,
                        page_size: 1000
                    }
                }).then(res=>{
                    this.employeeList = res.data.items;
                    this.formItem.items = [tableRow()];
                    if(this.isOrder){
                        Object.assign(this.formItem,this.order);
                        // this.formItem.items.forEach(e=>{
                        //     e.employees.forEach(e2=>{
                        //         e2.assigned_type = parseInt(e2.assigned_type);
                        //     })
                        // })
                    }else{
                        this.formItem.items = [tableRow()];
                    }                  
                })      		
        	}             
        },
       	dataInit2 () {
	    	if(this.store_id){
	    		this.formItem.store_id = this.store_id;
	    		this.getServiceList();
	    	}
	    	if(this.member.id){
	    		this.formItem.store_member_id = this.member.id;
	    		this.formItem.member_name = this.member.name;
                this.formItem.member_type = 2;	    		
	    	}else{
	            this.formItem.member_type = 1;
	        }
            this.formItem.items.forEach(row=>{
                if(row){
                    if(row.product_id&&this.member.id){
                        this.getPrice(row).then(data=>{
                            row.origin_price = data.origin_price;
                            row.price = parseFloat(data.final_price).toFixed(2);
                        })                          
                    }                    
                }
            })
                this.amountInit();
       	},
       	getServiceList () {
            let params = {
                type_code: 'grouped_service',
                store_id: this.store_id,
                is_grouped_by_category: 1,
                page_size:1000,
                    status:1,
                    response_data_model:"PLACE_ORDER"
            };
            this.$http.get("/boss/product/list",{params}).then(res=>{
                this.serviceList = res.data.items;
                if(this.member.id){
                    this.$http.get("/boss/order/orderedGroupedServiceList",{
                        params: {
                            store_member_id: this.member.id
                        }
                    })                 
                }                 
            })             		
       	},
        addEmployeeItem (el) {
            el.employees.push({
                employee_number: '',
                employee_id: '',
                // assigned_type: 1,
                amount: 0               
            });
        },    
        amountInit () {
            this.cart.member = this.member;
            this.cart.autoCalcPaymentAmount();
        },
        reduceEmployeeItem (el) {
            if(el.employees.length>1){
                el.employees.pop();
            }
        }, 
        checkOut (state) {
            let title = "";
            let okText = "";
            switch(state){
                case "pending": 
                    title = "挂单";
                    okText = "确认挂单";
                break;
                default: 
                    title = "结算";
                    okText = "确认结账";                
                break;
            }
            this.$Modal.confirm({
                title: title,
                width: 750,
                okText: okText,
                render: (h)=> {
                    let trarr = [];
                    let zxf = 0;
                    let dk = 0;
                    _this.formItem.payment_methods.map(e=>{
                        dk = dk+parseFloat(e.amount);
                    });
                    _this.formItem.items.map(e=>{
                        zxf = zxf+parseFloat(e.price);
                        trarr.push(
                            h('tr',[
                                h('td',e.product_name),
                                h('td',e.origin_price),
                                h('td',e.price)
                            ])
                        );                            
                    })
                    return h('div',[
                        h('table',{
                            attrs: {
                                class: 'table table-bordered'
                            }
                        },[
                            h('thead',[
                                h('tr',[
                                    h('th','消费内容'),
                                    h('th','原价'),
                                    h('th','售价')
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
                            h('span',"抵扣:"),
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
                            },`${zxf-dk} 元`),
                        ])                        
                    ])
                },
                onOk: ()=> {
                    let params = JSON.parse(JSON.stringify(this.formItem));
                    params.status = state;
                    let flag = true;
                    let flag2 = true;
                    params.items.forEach(e=>{
                        if(!e.product_id){
                            flag = false;
                        }
                        e.employees = e.employees.filter(e2=>{
                            return e2.employee_id !== '';
                        })
                        if(e.employees.length === 0){
                            flag2 = false;
                        }
                    })
                    util.clear(params);
                    if(!flag){
                        this.$Message.warning("请选择产品");
                        return;
                    }
                    if(!flag2){
                        this.$Message.warning("请至少选择一位服务技师");
                        return;                            
                    }

                    this.$http.post("/boss/order/create",params).then(res=>{
                        if(res.data.need_to_pay == 0){
                            this.$Notice.info({
                                title: '系统通知',
                                duration: 10,
                                desc: '下单成功'
                            });                                
                            this.dataInit();
                            this.cart.reset();   
                            return;                             
                        }                        
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
        },
        fwxmSelectChange (row) {
            this.serviceList.forEach(e=>{
                e.children.forEach(e2=>{
                    if(e2.id === row.product_id){
                        row.product_name = e2.name;
                        row.sku = e2.sku;
                        this.couponChange(row);
                    }
                })
            })
        },
        fwygSelectChange (row) {
            this.employeeList.forEach(e=>{
                e.children.forEach(e2=>{
                    if(e2.id === row.employee_id){
                        row.employee_name = e2.name;
                        row.employee_number = e2.employee_number;
                    }
                })
            })            
        },
        reduceRow (index) {
            this.formItem.items.splice(index,1);
        }        
    },
    mounted () {
        _this = this;
    	this.dataInit();
    	this.dataInit2();
    }
}
</script>

<style>

</style>
