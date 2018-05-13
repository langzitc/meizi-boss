<template>
    <div>
        <div>
            <Alert type="error">
                <RadioGroup v-model="service_type" type="button" size="small">
                    <Radio label="service">普通消费项目</Radio>
                    <Radio label="grouped_service" :disabled="!ygmserviceList.length">已购买套餐</Radio>
                </RadioGroup>               
                <Row :gutter="10" style="margin-top:20px" v-if="service_type === 'service'">
                    <CheckboxGroup v-model="social">
                    <i-col :xs="8" :sm="6" :md="4" :lg="2" v-for="el in serviceList" :key="el.id">
                        <Checkbox :label="el.id">
                            <span>{{el.name}}</span>
                        </Checkbox>                        
                    </i-col>
                    </CheckboxGroup>
                </Row>
                <Row :gutter="10" style="margin-top:20px" v-if="service_type === 'grouped_service'">
                    <i-col :xs="24">
                        <span>请选择会员</span>
                    </i-col>
                </Row>                
            </Alert>
            <table class="table table-bordered table-condensed kk-table">
                <thead>
                    <tr class="info">
                        <th colspan="4">服务项目</th>
                        <th v-for="el in staffTypeList" :key="el.id">{{el.name}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="warning">
                        <td>项目编号</td>
                        <td>名称</td>
                        <td>原价</td>
                        <td>售价</td>
                        <td v-for="el in staffTypeList" :key="el.id">
                            <Row class="clearfix text-center">
                                <i-col :xs="11">工号</i-col>
                                <i-col :xs="8">类型</i-col>
                                <i-col :xs="5">提成</i-col>
                            </Row>                            
                        </td>
                    </tr>
                    <tr class="active" v-for="(row,rindex) in formItem.items" :key="rindex">
                        <td width="100px">{{row.product_name}}</td>
                        <td width="150px">
                            {{row.product_name}}
                        </td>
                        <td width="70px">{{row.origin_price}}</td>
                        <td>
                            {{row.price}}
                        </td>                        
                        <td v-for="el in staffTypeList" :key="el.id">
                            <i-col :xs="2" class="text-center">
                                <Button type="text" @click="addEmployeeItem(row,el.id)" icon="android-add"></Button>
                            </i-col>
                            <i-col :xs="20">
                                <Row v-if="el2.$tid === el.id" v-for="(el2,index2) in row.employees" :key="index2" :gutter="22" style="margin: 5px 0">
                                    <i-col :xs="11">
                                        <Select
                                            v-model="el2.employee_id"
                                            placeholder="选择员工"
                                            :transfer="true"
                                            placement="top"
                                            @on-change="getTc(row,el2)"
                                            >
                                            <Option v-for="(option, index) in el.employee" :value="option.id" :key="index" :label="option.employee_number">
                                                <Row class="clearfix">
                                                    <i-col :xs="12">{{option.name}}</i-col>
                                                    <i-col :xs="12" class="text-right">{{option.mobile}}</i-col>
                                                </Row>
                                            </Option>
                                        </Select>                                      
                                    </i-col>
                                    <i-col :xs="8">
                                        <Select v-model="el2.assigned_type" @on-change="getTc(row,el2)" :transfer="true" placement="top">
                                            <Option :value="1">指定</Option>
                                            <Option :value="2">未指定</Option>
                                            <Option :value="3">内创</Option>
                                        </Select>
                                    </i-col>
                                    <i-col :xs="5"><Input v-model="el2.amount" readonly></Input></i-col>                                    
                                </Row> 
                            </i-col>
                            <i-col :xs="2" class="text-center">
                                <Button type="text" @click="reduceEmployeeItem(row,el.id)" icon="android-remove"></Button>
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
                <i-col :xs="4">
                    <Input type="text" v-model="formItem.payment_methods[0].amount">
                        <span slot="prepend">会员卡</span>
                    </Input>
                </i-col>
                <i-col :xs="4" :offset="1">
                    <Input type="text" v-model="formItem.payment_methods[1].amount">
                        <span slot="prepend">赠送金</span>
                    </Input>                            
                </i-col>
                <i-col :xs="4" :offset="1">
                    <Input type="text" v-model="formItem.payment_methods[2].amount">
                        <span slot="prepend">套餐卡</span>
                    </Input>                              
                </i-col>                                            
            </FormItem> 
            <FormItem label="实际应收">
                    <span class="text-amount">{{actual_amount}}</span>元
            </FormItem>                                        
            <FormItem label="订单日期">
                    <Input readonly type="text" v-model="date"></Input>
            </FormItem>  
            <FormItem label="选择部门" v-model="formItem.department_id">
                    <Select placeholder="选择部门" v-model="formItem.department_id">
                        <Option v-for="el in config.departList" :key="el.id" :value="el.id">{{el.name}}</Option>
                    </Select>
            </FormItem> 
            <!-- <FormItem label="顾客来源">
                <RadioGroup v-model="formItem.member_type">
                    <Radio :label="1">
                        散客
                    </Radio>
                    <Radio :label="2">
                        会员
                    </Radio>
                    <Radio :label="3">
                        拓客奖励
                    </Radio>                        
                </RadioGroup>                        
            </FormItem>                   -->
            <FormItem label="备注">
                    <Input  type="textarea" v-model="formItem.description"></Input>
            </FormItem>      
            <FormItem>
                    <Button type="primary" @click="checkOut('processing')" style="padding: 5px 22px">结账</Button>
                    <ButtonGroup>
                        <Button type="info" @click="checkOut('suspend')" style="padding: 5px 22px">联单</Button>
                        <Button type="success" @click="checkOut('liandan')">结算</Button>
                    </ButtonGroup>                    
                    <Button type="warning" @click="checkOut('pending')" style="padding: 5px 22px">挂单</Button>
            </FormItem>                                            
        </Form>          
    </div>  
</template>

<script>
let tableRow = (staffTypeList)=>{
    let arr = [];
    staffTypeList.forEach(element => {
        arr.push(
            {
                employee_number: '',
                employee_id: '',
                assigned_type: 1,
                amount: 0,
                $tid: element.id
            }            
        )
    });
    return {
        product_id: '',
        product_name: '',
        sku: '',
        price: 0,
        origin_price: 0,
        ordered_qty: 1,
        employees: arr    
    }
}
export default {
    name: 'cashier-xmxf',
    data () {
        return {
            social: [],
            service_type: "service",
            staffTypeList: [],
            serviceList: [],
            ygmserviceList: [],
            formItem: {
                store_member_id: '',
                order_type: 0,
                member_type: 1,
                member_name: '',
                store_id: '',
                amount: 0,
                status: '',
                department_id: '',
                description: '',
                items: [],
                payment_methods: [{
                    method: 'MemberCardAmount',
                    amount: 0
                },{
                    method: 'MemberCardGivenAmount',
                    amount: 0                    
                },{
                    method: 'MemberPreOrdered',
                    amount: 0                    
                }]                
            }   
        }
    },
    props: {
        config: {
            type: Object,
            required: true
        }
    },
    computed: {
        actual_amount () {
            let num = 0;
            this.formItem.items.map(e=>{
                num+=parseFloat(e.price);
            })
            let num2 = 0;
            this.formItem.payment_methods.map(e=>{
                num2+= parseFloat(e.amount);
            })
            return num-num2;
        },
        amount () {
            let num = 0;
            this.formItem.items.map(e=>{
                num+=parseFloat(e.price);
            })
            return num;
        },
        date () {
            return (new Date()).Format('yyyy-MM-dd');
        },
        store_member_id () {
            return this.config.member.id||0;
        }
    },
    watch: {
        store_member_id (n,o) {
            this.getYgmtc();
        },
        social (n,o) {
            console.log(n);
        }
    },
    methods: {
        productChange (row){
            this.serviceList.map(e=>{
                if(e.id == row.product_id){
                    row.product_name = e.name;
                    row.sku = e.sku;
                    row.origin_price = e.origin_price||0;
                    let percent = 1;
                    if(this.config.member.card&&this.config.member.card.discount_amount_for_service_item){
                        percent = parseFloat(this.config.member.card.discount_amount_for_service_item);
                    }
                    row.price = (e.price*percent).toFixed(2);
                    this.getTc(row);
                }
            })
        },
        getYgmtc () {
            this.$http.get("/boss/order/orderedGroupedServiceList",{params: {
                store_member_id: this.store_member_id
            }}).then(res=>{
                this.ygmserviceList = res.data;
            })            
        },
        checkOut (state) {
            let title = "";
            let okText = "";
            switch(state){
                case "pending": 
                    title = "挂单";
                    okText = "确认挂单";
                break;
                case "suspend": 
                    title = "联单";
                    okText = "确认联单";                 
                break;
                default: 
                    title = "结算";
                    okText = "确认结账";                
                break;
            }
            let _this = this;
            if(this.config.member.id){
                this.formItem.member_type = 2;
            }else{
                this.formItem.member_type = 1;
            } 
            if(state === 'liandan'){
                this.$http.get("/boss/order/listSuspendBatchOrders",{params:{
                    store_member_id: this.config.member.id,
                    store_id: this.config.store_id
                }}).then(res=>{
                    let idea = res.data.items;
                    if(idea.length){
                        this.$Modal.confirm({
                            title: '联单结算',
                            width: 750,
                            okText: '确认结算',
                            render: (h)=>{
                                let el = [];
                                let xmlr = (e)=>{
                                    let arr = [];
                                    e.items.map(item=>{
                                        arr.push(item.product_name);
                                    })
                                    return arr.join(',');
                                }
                                let sfje = (e)=>{
                                    let n = 0;
                                    e.payments.map(item=>{
                                        if(item.method==='ToBeDetermined'){
                                            n+=parseFloat(item.amount);
                                        }
                                    })
                                    return n;
                                }
                                let dk = (e)=>{
                                    let n = 0;
                                    e.payments.map(item=>{
                                        if(item.method!=='ToBeDetermined'){
                                            n+=parseFloat(item.amount);
                                        }
                                    })
                                    return n;
                                }  
                                idea.map(e=>{
                                    el.push(h('tr',[
                                        h('td',e.trans_number),
                                        h('td',xmlr(e)),
                                        h('td',dk(e)),
                                        h('td',sfje(e)),
                                        h('td',[
                                            h("Button",{
                                                props: {
                                                    type: 'warning',
                                                    size: 'small'
                                                },
                                                on: {
                                                    click (){
                                                        _this.$Modal.confirm({
                                                            title: '系统提示',
                                                            okText: '确认删除',
                                                            content: "确认删除订单？", 
                                                            onOk: ()=>{
                                                                _this.$http.post("/boss/order/cancel",{id: e.id}).then(res=>{
                                                                    _this.$Notice.success({
                                                                        title: '系统通知',
                                                                        duration: 10,
                                                                        desc: res.message
                                                                    });         
                                                                    _this.$Modal.remove()                                                   
                                                                })   
                                                            }   
                                                        });                                                            
                                                    }
                                                }                                                    
                                            },'删除')
                                        ])
                                    ]));
                                })
                                return h('table',{
                                    attrs: {
                                        class: 'table table-bordered'
                                    }
                                },[
                                    h('thead',[
                                        h('tr',[
                                            h('th','流水单号'),
                                            h('th','项目内容'),
                                            h('th','抵扣'),
                                            h('th','实付金额'),
                                            h('th','操作')
                                        ])
                                    ]),
                                    h('tbody',el)
                                ])
                            },
                            onOk: ()=>{
                                let a = 0;
                                let b = 0;
                                let c = [];
                                let d = [];
                                idea.map(item=>{
                                    item.payments.map(e=>{
                                        if(e.method === 'ToBeDetermined'){
                                            a+= parseFloat(e.amount);
                                        }else{
                                            b+=parseFloat(e.amount);
                                        }
                                    });   
                                    c.push(item.id);
                                    d.push(item.trans_number);                                     
                                })
                                this.$router.push({
                                    name: 'cashier',
                                    query: {
                                        type: 'jiezhang',
                                        style: 'cash',
                                        total_count: a+b,
                                        reduce_count: b,
                                        id: c,
                                        trans_number: d,
                                        state: state
                                    }
                                }); 
                            }
                        });                            
                    }else{
                        this.$Notice.info({
                            title: '系统通知',
                            duration: 5,
                            desc: '暂无联单结算的订单，请先下单!'
                        });                            
                    }
                });
            }else{
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
                        params.store_member_id = this.config.member.id;
                        params.store_id = this.config.store_id;
                        let flag = true;
                        params.items.map(e=>{
                            if(!e.product_id){
                                flag = false;
                            }
                            e.employees.map((e2,i)=>{
                                if(!e2.employee_id){
                                    e.employees.splice(i,1);
                                }
                            })
                        })
                        if(!flag){
                            this.$Message.warning("请选择产品");
                            return;
                        }
                        this.$http.post("/boss/order/create",params).then(res=>{
                            switch(state){
                                case "suspend": 
                                    this.$Notice.success({
                                        title: '系统通知',
                                        duration: 10,
                                        desc: '联单成功！请继续下单，或者点击结算!'
                                    });
                                    this.init();
                                break;
                                case "pending": 
                                    this.$Notice.info({
                                        title: '系统通知',
                                        duration: 10,
                                        desc: '挂单成功！请在挂单列表中重新结算!'
                                    });
                                    this.init();                                    
                                break;
                                default: 
                                    let a = 0;
                                    let b = 0;
                                    res.data.payments.map(e=>{
                                        if(e.method === 'ToBeDetermined'){
                                            a = parseFloat(e.amount);
                                        }else{
                                            b+=parseFloat(e.amount);
                                        }
                                    });
                                    this.$router.push({
                                        name: 'cashier',
                                        query: {
                                            type: 'jiezhang',
                                            style: 'cash',
                                            total_count: a+b,
                                            reduce_count: b,
                                            id: res.data.id,
                                            trans_number: res.data.trans_number,
                                            state: state
                                        }
                                    });                                     
                                break;
                            }                   
                        });
                    }
                });                     
            }            
        },
        init () {
            this.$store.dispatch("GET_STAFF_TYPE_LIST2",{store_id: this.config.store_id}).then((data)=>{
                data.map(async (e)=>{
                    let g = (id)=>{
                        return new Promise((resolve,reject)=>{
                            this.$http.get("/boss/employee/list",{
                                params: {
                                    job_title_id: id,
                                    store_id: this.config.store_id
                                }
                            }).then(res=>{
                                resolve(res.data.items);
                            })
                        })
                    }
                    let employee = await g(e.id);
                    e.employee = employee;
                })
                this.staffTypeList = data;
                this.formItem.items = [tableRow(data)];
            })
            let params = {
                type_code: 'service',
                store_id: this.config.store_id
            };
            this.$http.get("/boss/product/list",{params}).then(res=>{
                this.serviceList = res.data.items;
            })
        },
        addEmployeeItem (el,id) {
            el.employees.push({
                employee_number: '',
                employee_id: '',
                assigned_type: 1,
                amount: 0,
                $tid: id                
            });
        },    
        reduceEmployeeItem (el,id) {
            let i = el.employees.reverse().findIndex((e)=>{
                return e.$tid === id;
            });
            let l = el.employees.filter((e)=>{
                return e.$tid === id;
            })
            if(i!==-1&&l.length>1){
                el.employees.splice(i,1);
            }
        },
        /**
         * 提成计算获取
         */
        getTc (el,el2) {
            if(el.product_id){
                if(el2){
                    if(el2.employee_id&&el.price){
                        let params = {
                            product_id: el.product_id,
                            employee_id: el2.employee_id,
                            store_id: this.config.store_id,
                            assigned_type: el2.assigned_type,
                            price: el.price,
                            member_card_operation: 2
                        };
                        this.$http.post("/boss/order/calcEmployeeCommission",params).then(res=>{
                            el2.amount = res.data.amount;
                        })
                    }
                }else{
                    let els = el.employees;
                    els.map(async (e)=>{
                        if(e.employee_id&&el.price){
                            let params = {
                                product_id: el.product_id,
                                employee_id: e.employee_id,
                                store_id: this.config.store_id,
                                assigned_type: e.assigned_type,
                                price: el.price,
                                member_card_operation: 2                            
                            };   
                            let g = ()=>{
                                return new Promise((resolve,reject)=>{
                                    this.$http.post("/boss/order/calcEmployeeCommission",params).then(res=>{
                                        resolve(res.data.amount);
                                    })                                     
                                });                                
                            }                                    
                            e.amount = await g();                
                        }
                    })
                }
            }
        },
        addItem (){
            this.formItem.items.push(tableRow(this.staffTypeList));
        },
        removeItem () {
            this.formItem.items.pop();
        }      
    } 
}
</script>

<style>

</style>
