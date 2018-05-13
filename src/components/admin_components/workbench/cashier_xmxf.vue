<template>
    <div>
        <div class="table-wrap">
            <table class="table table-bordered table-condensed kk-table">
                <thead>
                <tr class="info">
                    <th></th>
                    <th>项目编号</th>
                    <th>名称</th>
                    <th>原价</th>
                    <th>售价</th>
                    <th>服务员工</th>
                </tr>
                </thead>
                <tbody>
                <tr class="active" v-for="(row,rindex) in formItem.items" :key="rindex">
                    <td width="50px">
                        <Button icon="android-remove" @click="reduceRow(rindex)" size="small" type="ghost"></Button>
                    </td>
                    <td width="200px">
                        <Dropdown transfer placement="bottom-start" trigger="click">
                                <span>
                                    <Input type="text" v-model="row.sku" placeholder="选择服务项目"></Input>
                                </span>
                            <Alert slot="list" type="info" style="max-width:800px;min-width:400px">
                                <p class="text-muted text-center" v-show="!serviceList.length">无数据</p>
                                <Form :label-width="80" label-position="left">
                                    <FormItem label="已购套餐" style="margin-bottom:1em" class="ordered-grouped-service-container" v-if="groupServiceList.length">
                                        <div class="ordered-grouped-service-items" v-for="orderedService in groupServiceList">

                                            <div v-for="orderedItem in getOrderedGroupedServiceBySource(orderedService)">
                                                <span  v-on:click="fwxmSelectOrderedItem(row, rindex, orderedItem.id)">{{orderedItem.getData("name")}}{{orderedItem.attributeLabels}}</span>
                                            </div>
                                        </div>
                                    </FormItem>
                                    <FormItem v-for="service in serviceList" :label="service.name" :key="service.id" style="margin-bottom:1em">
                                        <RadioGroup v-model="row.product_id" @on-change="fwxmSelectChange(row)" type="button">
                                            <Radio style="height:25px;line-height:25px" :label="ser.id" v-for="ser in service.children" :key="ser.id">
                                                {{ser.name}}
                                            </Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Form>
                            </Alert>
                        </Dropdown>
                    </td>
                    <td width="150px">
                        {{row.product_name}}
                    </td>
                    <td width="70px">{{row.origin_price}}</td>
                    <td width="70px">
                        {{row.price}}
                    </td>
                    <td>
                        <i-col :xs="2" class="text-center">
                            <Button type="ghost" style="margin-top:5px" @click="addEmployeeItem(row)" icon="android-add"></Button>
                        </i-col>
                        <i-col :xs="20">
                            <Row :gutter="10" style="margin: 5px 0" v-for="(el2,index2) in row.employees" :key="index2">
                                <i-col :xs="12">
                                    <Dropdown transfer placement="bottom" trigger="click" style="width:100%">
                                        <span>
                                            <Input type="text" v-model="el2.employee_name" placeholder="选择服务员工"></Input>
                                        </span>
                                        <Alert slot="list" type="warning" style="max-width:800px;min-width:400px">
                                            <p class="text-muted text-center" v-show="!employeeList.length">无数据</p>
                                            <Form :label-width="80" label-position="left">
                                                <FormItem v-for="employee in employeeList" :label="employee.name" :key="employee.id" style="margin-bottom:0">
                                                    <RadioGroup v-model="el2.employee_id" @on-change="fwygSelectChange(el2)" type="button" size="small">
                                                        <Radio :disabled="isDisable(sers.id,el2.employee_id,row)" style="height:20px;line-height:20px" :label="sers.id" v-for="sers in employee.children" :key="sers.id">(&nbsp;&nbsp;{{sers.employee_number}}&nbsp;&nbsp;)-{{sers.name}}</Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                            </Form>
                                        </Alert>
                                    </Dropdown>
                                </i-col>
                                <i-col :xs="12">
                                    <Select :transfer="true" placement="top" v-model="el2.assigned_type">
                                        <Option :value="1">指定</Option>
                                        <Option :value="2">未指定</Option>
                                        <Option :value="3">内创</Option>
                                    </Select>
                                </i-col>
                            </Row>
                        </i-col>
                        <i-col :xs="2" class="text-center">
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
                        <Option v-for="item in coupon_cash" :value="item.id" :key="item.id">(￥{{ item.amount }}) {{ item.title }} </Option>
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
                <Button type="warning" @click="checkOut('pending')" style="padding: 5px 22px">挂单</Button>
            </FormItem>
        </Form>
        <div class="part-loading" v-show="loading">
            <Spin fix>
                <Icon type="load-c" size=28 class="part-loading-spin-icon-load"></Icon>
                <div>加载中</div>
            </Spin>
        </div>

        <Modal
                title="请选择属性"
                v-model="priceAttributeModel"
                footer=""
                class-name="vertical-center-modal"
                :closable="true">
            <span class="advanced-price-selection-container" v-for="item in priceAttributeModelData">
                <span style="display:block;width:auto;margin:5px 0px;background: #FFFFFF; padding:4px 10px;cursor:pointer"
                      @click="selectCartItemData(item.cartItem,item)">{{item.label}} <span class="price">{{item.priceItem.price}}</span></span>
                <br/>
            </span>
        </Modal>
    </div>
</template>

<script>
    import util from '../../../util'
    import OrderedGroupedServiceItem from "../../../model/StoreMember/OrderedGroupedServiceItem";
    import Cart from "../../../model/Cart";
    import OrderedGroupedService from "../../../model/StoreMember/OrderedGroupedService"

    let _this;
    export default {
        name: 'cashier-xmxf',
        data () {
            let cart = Cart.newCart();
            window.CURCART = cart;
            return {
                priceAttributeModel: false,
                priceAttributeModelData:[],
                cart: cart,
                serviceList: [],
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
                return this.cart.getGrandTotal();
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
                return this.order&&this.order.id&&this.order.order_type == 0;
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
                this.cart.setMember(n);
                this.dataInit2();
                this.getGroupService();
            },
            store_id (n,o) {
                this.cart.reset();
                this.dataInit();
                this.dataInit2();
            },
            order: {
                deep: true,
                handler(n,o){
                    setTimeout(()=>{
                        this.cart.parseOrder(n);
                    },1000);
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
            getOrderedGroupedServiceBySource(serviceItem) {
                let groupedService = OrderedGroupedService.newInstance();
                groupedService.initialize(serviceItem);
                return groupedService.items;
            },
            fwxmSelectOrderedItem(row, rowIndex, OrderItemId) {
                this.groupServiceList.map((groupService)=>{
                    groupService.items.map((item)=>{
                        if(item.id != OrderItemId) {
                            return;
                        }
                        let orderedGroupedServiceItemIns = OrderedGroupedServiceItem.newInstance(item);
                        orderedGroupedServiceItemIns.convertToCartItem(row);
                        this.amountInit();
                    })
                });
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
                        attributes:{},
                        product_id: row.product_id,
                        store_member_id: this.member.id,
                        customer_ordered_grouped_service_item_id: row.ordered_grouped_service_item_id,
                        employee_id: ''
                    };
                    for(let attributeCode in row.attributes) {
                        params["attributes"][attributeCode] = row.attributes[attributeCode];
                    }
                    this.$http.post("/boss/order/calcProductPrice",params).then(res=>{
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
                this.amountInit();
            },
            getServiceList () {
                let params = {
                    type_code: 'service',
                    store_id: this.store_id,
                    is_grouped_by_category: 1,
                    page_size:1000,
                    status:1,
                    response_data_model:"PLACE_ORDER"
                };
                this.$http.get("/boss/product/list",{params}).then(res=>{
                    this.serviceList = res.data.items;
                    this.getGroupService();
                })
            },
            getGroupService () {
                if(this.member.id){
                    this.$http.get("/boss/order/orderedGroupedServiceList",{
                        params: {
                            store_member_id: this.member.id
                        }
                    }).then(res=>{
                        this.groupServiceList = res.data;
                    })
                }else{
                    this.groupServiceList = [];
                }                
            },
            addEmployeeItem (el) {
                el.employees.push({
                    employee_number: '',
                    employee_id: '',
                    assigned_type: 2,
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
                        let zxf = _this.cart.getGrandTotal();
                        let dk = _this.cart.getDeductionAmount();
                        let payAmount = _this.cart.getToBeDeterminedAmount();
                        _this.formItem.items.map(e=>{
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
                                },`${payAmount} 元`),
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
                                    this.cart.reset();
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
            selectCartItemData(cartItem, attribute){
                let service = attribute.service;
                cartItem.product_name = service.name;
                cartItem.sku = service.sku;
                cartItem.attributes = {
                }
                service.price_attributes_detail.map((priceAttribute)=>{
                    cartItem.attributes[attribute.attribute_code] = attribute.value;
                })

                console.log(attribute)
                this.priceAttributeModel = false;
                this.priceAttributeModelData = [];
                this.couponChange(cartItem);
            },
            fwxmSelectChange (row) {
                row.ordered_grouped_service_item_id = "";
                let selectedService = null;
                this.serviceList.forEach(e=>{
                    e.children.forEach(e2=>{
                        if(e2.id === row.product_id){
                            selectedService = e2;
                        }
                    })
                })
                let advancedPrices = selectedService.advanced_prices;
                console.log(selectedService)
                if(advancedPrices && advancedPrices.length > 0) {
                    this.priceAttributeModel = true;
                    this.priceAttributeModelData = [];

                    let content = "";
                    advancedPrices.map((advancedPrice)=>{
                        let attributes = advancedPrice.attributes;
                        for(let attributeCode in attributes) {
                            let attribute = attributes[attributeCode];
                            attribute.cartItem = row;
                            attribute.service = selectedService;
                            attribute.attribute_code = attributeCode;
                            attribute.priceItem = advancedPrice;
                            this.priceAttributeModelData.push(attribute);
                        }
                    });
                    return;
                } else {
                    row.product_name = selectedService.name;
                    row.sku = selectedService.sku;
                    this.couponChange(row);
                }
            },
            selectProductAttribute(a) {
                console.log(a)
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

<style lang="less">
    @orderedTextColor : #b92c28;
    @orderedTextHoverColor: #ff0000;
.ordered-grouped-service-items span {
    margin-right:10px;width:auto; float:left;padding:4px 10px;background:#FFF;border:solid 1px #e1e1e1;
    cursor:pointer;
    font-weight: bold;
    color:@orderedTextColor;
}
.ordered-grouped-service-items span:hover {
    color: @orderedTextHoverColor;
}
.ordered-grouped-service-items span:first-child {
    margin-left:0px;
}

    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .ordered-grouped-service-container {
        color:@orderedTextColor;
    }
    .price {
        color: @orderedTextColor
    }
    .advanced-price-selection-container {
        font-size: 14px;
    }
</style>
