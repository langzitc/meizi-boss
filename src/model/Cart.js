import AbstractModel from "./AbstractModel";

class Cart extends AbstractModel {
    member = {}
    getCopyFields() {
        return {
            id:0,
            amount:0,
            order_type:0,
            member_type:0,
            store_member_id:"",
            member_name:"",
            store_id:"",
            status:"",
            description:"",
        }
    }

    reset() {
        this.clearItems();
        this.newItem();
        this.data.payment_methods.map(($method)=>{
            $method.amount = 0;
        });
    }
    constructor() {
        console.log("INIT CART")
        super();
        let initData = this.getCopyFields();
        for(let fieldName in initData) {
            this._data[fieldName] = initData[fieldName];
        }
        this._data["items"] = [];
        this._data["payment_methods"] = [];
        this._data.payment_methods.push(new PaymentMethod(this,"MemberCardAmount",0));
        this._data.payment_methods.push(new PaymentMethod(this,"MemberCardGivenAmount",0));
        this._data.payment_methods.push(new PaymentMethod(this,"MemberPreOrdered",0));
        this._data.payment_methods.push(new PaymentMethod(this,"BonusCoupon",0));
        this._data.payment_methods.push(new PaymentMethod(this,"ToBeDetermined",0));
        this.newItem();
    }
    get id() {
        this.getData("id","int")
    }
    set id(v) {
        return this.setData("id",v,"int");
    }
    get amount() {
        return this.getData("amount","float");
    }
    set amount(v) {
        this.setData("amount", v);
    }

    get order_type() {
        return this.getData("order_type","int");
    }
    set order_type(v) {
        this.setData("order_type", v);
    }
    get member_type() {
        return this.getData("member_type","int");
    }
    set member_type(v) {
        this.setData("member_type", v);
    }

    get store_member_id() {
        return this.getData("store_member_id");
    }
    set store_member_id(v) {
        this.setData("store_member_id", v);
    }
    get member_name() {
        return this.getData("member_name");
    }
    set member_name(v) {
        this.setData("member_name", v);
    }
    get store_id() {
        return this.getData("store_id");
    }
    set store_id(v) {
        this.setData("store_id", v);
    }
    get status() {
        return this.getData("status");
    }
    set status(v) {
        this.setData("status", v);
    }
    get items() {
        return this.getData("items");
    }
    set items(v) {
        this.setData("items", v);
    }
    get description() {
        return this.getData("description");
    }
    set description(v) {
        this.setData("description", v);
    }
    setMember(v) {
        this.member = v;
        if(v && v.id) {
            this.store_member_id = v.id;
            this.autoCalcPaymentAmount();
        }
    }
    getMember() {
        return this.member;
    }
    getPaymentMethodByCode(code) {
        let methodIndex = -1;
        this._data.payment_methods.map((item,index)=>{
            if(item.method == code) {
                methodIndex = index;
            }
        })
        if(methodIndex >-1) {
            return this._data.payment_methods[methodIndex];
        }
        return null;
    }
    newItem() {
        let item = new CartItem();
        this._data.items.push(item);
        return item;
    }
    clearItems() {
        while(this._data.items.length >0) {
            this._data.items.pop();
        }
    }
    autoCalcPaymentAmount() {
        let totalAmount = 0;
        let preOrderedAmount = 0;
        let toBeDeterminedMethod = this.getPaymentMethodByCode("ToBeDetermined");
        toBeDeterminedMethod.amount = 0;

        this._data.items.forEach(e=>{
            if(e.price){
                totalAmount += parseFloat(e.price);
                if(e.ordered_grouped_service_item_id != "") {
                    preOrderedAmount += parseFloat(e.price);
                }
            }
        });

        let preOrderedMethod = this.getPaymentMethodByCode("MemberPreOrdered");
        if(preOrderedAmount >0) {
            preOrderedMethod.amount = preOrderedAmount;
            totalAmount -= preOrderedAmount;
            if(totalAmount <=0 ) {
                totalAmount = 0;
            }
        } else {
            preOrderedMethod.amount = 0;
        }


        let couponCodeMethod = this.getPaymentMethodByCode("BonusCoupon");

        if(couponCodeMethod.amount >0) {
            totalAmount -= couponCodeMethod.amount;
            if(totalAmount <=0 ) {
                totalAmount = 0;
            }
        }
        toBeDeterminedMethod.amount = totalAmount;

        if(!this.member || !this.member.card || !this.member.card.id) {
            this.getPaymentMethodByCode("MemberCardGivenAmount").amount = 0;
            this.getPaymentMethodByCode("MemberCardAmount").amount = 0;
            return;
        }
        let givenAmount = parseFloat(this.member.card.given_amount);

        if(givenAmount >0 ) {

            let method = this.getPaymentMethodByCode("MemberCardGivenAmount");
            if(totalAmount > 0) {
                if(givenAmount > totalAmount) {
                    method.amount = totalAmount;
                } else {
                    method.amount = givenAmount;
                }
                totalAmount -= givenAmount;
                if(totalAmount <=0 ) {
                    totalAmount = 0;
                }
            } else {
                method.amount = 0;
            }
        }

        let cardAmount = parseFloat(this.member.card.amount);
        if(cardAmount >0 ) {
            let method = this.getPaymentMethodByCode("MemberCardAmount");
            if(totalAmount >0) {

                if(cardAmount >totalAmount) {
                    method.amount = totalAmount;
                } else {
                    method.amount = cardAmount;
                }
                totalAmount -= cardAmount;
                if(totalAmount <=0 ) {
                    totalAmount = 0;
                }
            } else {
                method.amount = 0;
            }
        }

        toBeDeterminedMethod.amount = totalAmount;
    }

    /**
     * 现付, 除抵扣之后的
     * @returns {string}
     */
    getToBeDeterminedAmount() {
        let method = this.getPaymentMethodByCode("ToBeDetermined");
        return parseFloat(method.amount).toFixed(2);
    }

    parseOrder(order) {
        let initData = this.getCopyFields();
        for(let fieldName in initData) {

            let value = typeof order[fieldName] != "undefined" ? order[fieldName] : initData[fieldName];
            if(fieldName == "id" || fieldName == "order_type" || fieldName == "member_type" ) {
                this.setData(fieldName, value, "int");
            } else if(fieldName == "amount") {
                this.setData(fieldName, value, "float");
            } else {
                this.setData(fieldName, value);
            }
        }

        if(order.items.length <= 0) {
            let newItem = this.newItem();
        } else {
            this.clearItems();
        }

        order.items.map(($item)=>{
            let newItem = this.newItem();
            newItem.parseOrderItem($item);
        });
        order.payments.map(($payment)=>{
            let payment = this.getPaymentMethodByCode($payment.method);
            payment.parseOrderPayment($payment);
        });
        this.autoCalcPaymentAmount();
    }

    getGrandTotal () {
        let total = 0;
        this._data.items.map((item)=>{
            if(item.price == "") {
                item.price = "0";
            }
            total += parseFloat(item.price);
        })
        return total;
    }

    getDeductionAmount() {
        return (this.getGrandTotal() - this.getToBeDeterminedAmount()).toFixed(2);
    }
}

class CartItem extends  AbstractModel {
    getCopyFields() {
        return {
            product_id:"",
            ordered_grouped_service_item_id:"",
            product_name:"",
            sku:"",
            price:0,
            origin_price:0,
            ordered_qty:0,
            coupon_ids:"",
            attributes:{},
        };
    }
    constructor() {
        super();
        let initData = this.getCopyFields();
        for(let fieldName in initData) {
            this._data[fieldName] = initData[fieldName];
        }
        this._data.employees = [];
        this._data.employees.push(new CartItemEmployee());
    }
    parseOrderItem($item) {
        let initData = this.getCopyFields();
        for(let fieldName in initData) {
            let value = $item[fieldName] ? $item[fieldName] : initData[fieldName];

            if(fieldName == "attributes") {
                this.setData("attributes", value, "object");
            } else if(fieldName == "price" || fieldName == "origin_price" || fieldName == "ordered_qty") {
                this.setData(fieldName, value, "float");
            } else{
                this.setData(fieldName, value);
            }
        }
        if($item.employees && $item.employees.length >0) {
            this._data.employees.pop();
        }
        $item.employees.map(($employee)=>{
            let employee = new CartItemEmployee();
            employee.parseOrderItemEmployee($employee);
            this._data.employees.push(employee);
        });

    }

    get employees () {
        return this._data.employees;
    }
    set employees (v) {
        this._data.employees = v;
    }

    get product_id() {
        return this.getData("product_id");
    }
    set product_id(v) {
        this.setData("product_id", v);
    }
    get ordered_grouped_service_item_id() {
        let v = this.getData("ordered_grouped_service_item_id","int");
        if(v <= 0) {
            return "";
        }
        return v;
    }
    set ordered_grouped_service_item_id(v) {
        if(v == "0" || v == 0) {
            v = "";
        }
        this.setData("ordered_grouped_service_item_id", v);
    }
    get product_name() {
        return this.getData("product_name");
    }
    set product_name(v) {
        this.setData("product_name", v);
    }
    get sku() {
        return this.getData("sku");
    }
    set sku(v) {
        this.setData("sku", v);
    }
    get price() {
        return this.getData("price");
    }
    set price(v) {
        this.setData("price", v);
    }
    get origin_price() {
        return this.getData("origin_price");
    }
    set origin_price(v) {
        this.setData("origin_price", v);
    }
    get ordered_qty() {
        return this.getData("ordered_qty");
    }
    set ordered_qty(v) {
        this.setData("ordered_qty", v);
    }
    get coupon_ids() {
        return this.getData("coupon_ids");
    }
    set coupon_ids(v) {
        this.setData("coupon_ids", v);
    }
    get attributes() {
        return this.getData("attributes");
    }
    set attributes(v) {
        if(typeof attributes == "string" && v.length > 2) {
            let objV ;
            eval("objV = " +  v + ";");
            v = objV;
        }
        this.setData("attributes", v);
    }
}

class PaymentMethod extends AbstractModel {

    constructor(cart, method, amount, couponId="") {
        super()
        this._data.amount = 0;
        this._data.method = method;
        this._data.coupon_id = couponId;
        this.cart = cart;
    }
    parseOrderPayment($payment) {
        this.setData("amount",$payment.amount,"float");
        this.coupon_id = $payment.coupon_id;
    }
    get amount() {
        let v = this.getData("amount","float");
        if(v == "") {
            return 0;
        }
        return v.toFixed(2);
    }
    set amount(v) {
        if(v === "") {
            v = 0;
        }
        this.setData("amount",v,"float");
        if(this._data.amount === null) {
            this._data.amount = 0;
        }
    }

    get method() {
        return this._data.method;
    }
    set method(v) {
        this._data.method = v;
    }

    get coupon_id() {
        return this._data.coupon_id;
    }
    set coupon_id(v) {
        this.amount = 0;
        if(this.cart.member && this.cart.member.cash_coupons) {
            this.cart.member.cash_coupons.map(($coupon)=>{
                if(v == $coupon.id ) {
                    this.setData("amount", $coupon.amount, "float");
                }
            });
        }
        this._data.coupon_id = v;
        this.cart.autoCalcPaymentAmount();
    }
    toJSON() {
        return {
            amount:this.amount,
            method: this.method,
            coupon_id: this.coupon_id
        }
    }
}

class CartItemEmployee extends AbstractModel {
    constructor() {
        super();
        this._data["employee_number"] = "";
        this._data["employee_name"] = "";
        this._data["employee_id"] = "";
        this._data["assigned_type"] = 2;
        this._data["amount"] = 0;
    }

    parseOrderItemEmployee($employee) {
        this._data["employee_number"] = $employee.employee_number;
        this._data["employee_name"] = $employee.employee_name;
        this._data["employee_id"] = $employee.employee_id;
        this._data["assigned_type"] = parseInt($employee.assigned_type);
        this._data["amount"] = parseFloat($employee.amount);
    }

    //employee_name
    get employee_name() {
        return this._data["employee_name"]
    }
    set employee_name(v) {
        this._data["employee_name"] = v;
    }

    get employee_number() {
        return this._data["employee_number"]
    }
    set employee_number(v) {
        this._data["employee_number"] = v;
    }
    //employee_id
    get employee_id() {
        return this._data["employee_id"]
    }
    set employee_id(v) {
        this._data["employee_id"] = v;
    }
    //assigned_type
    get assigned_type() {
        return this._data["assigned_type"]
    }
    set assigned_type(v) {
        this._data["assigned_type"] = v;
    }

    //amount
    get amount() {
        return this._data["amount"]
    }
    set amount(v) {
        this._data["amount"] = v;
    }
}

export default {
    name: "Cart",
    CartItem: CartItem,
    CartItemEmployee: CartItemEmployee,
    CartInstance:function() {
        if(window.CARTINS) {
            return window.CARTINS;
        }
        return window.CARTINS = new Cart();
    },
    newCart: function() {
        return new Cart();
    }
}
