
/**
 * BeautyOrderPaymentEntity
 */
import Utils from './../Utils';
import AbstractModel from '../AbstractModel';
export default class extends AbstractModel {
    FIELDS () { 
        return  {
            "id": {
                    "type": "number",
                    "name": "id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "account_number": {
                    "type": "string",
                    "name": "account_number",
                    "null": "YES",
                    "comment": "支付卡号或支付帐号的ID",
                    "default": ""
            },
            "transaction_id": {
                    "type": "string",
                    "name": "transaction_id",
                    "null": "YES",
                    "comment": "外部支付方式trasaction ID",
                    "default": ""
            },
            "coupon_id": {
                    "type": "number",
                    "name": "coupon_id",
                    "null": "YES",
                    "comment": "现金优惠券ID, 默认为0, 则不是优惠券",
                    "default": "0"
            },
            "order_id": {
                    "type": "number",
                    "name": "order_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "method": {
                    "type": "string",
                    "name": "method",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "֧",
                    "default": null
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "0:δ֧",
                    "default": "0"
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get account_number(){ return this.getData('account_number');}
    set account_number(v){ return this.setData('account_number',v);}

    get transaction_id(){ return this.getData('transaction_id');}
    set transaction_id(v){ return this.setData('transaction_id',v);}

    get coupon_id(){ return this.getData('coupon_id');}
    set coupon_id(v){ return this.setData('coupon_id',v);}

    get order_id(){ return this.getData('order_id');}
    set order_id(v){ return this.setData('order_id',v);}

    get method(){ return this.getData('method');}
    set method(v){ return this.setData('method',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}


}
