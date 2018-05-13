
/**
 * BeautyStoreDailyRevenueEntity
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
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "total_amount": {
                    "type": "number",
                    "name": "total_amount",
                    "null": "NO",
                    "comment": "总金额",
                    "default": "0.0000"
            },
            "deduction_amount": {
                    "type": "number",
                    "name": "deduction_amount",
                    "null": "YES",
                    "comment": "抵扣金额",
                    "default": "0.0000"
            },
            "online_amount": {
                    "type": "number",
                    "name": "online_amount",
                    "null": "NO",
                    "comment": "线上金额,即可提现金额",
                    "default": "0.0000"
            },
            "commission_amount": {
                    "type": "number",
                    "name": "commission_amount",
                    "null": "NO",
                    "comment": "提成",
                    "default": "0.0000"
            },
            "refund_amount": {
                    "type": "number",
                    "name": "refund_amount",
                    "null": "NO",
                    "comment": "退款",
                    "default": "0.0000"
            },
            "withdraw_amount": {
                    "type": "number",
                    "name": "withdraw_amount",
                    "null": "NO",
                    "comment": "已经提现金额",
                    "default": "0.0000"
            },
            "withdraw_locked_amount": {
                    "type": "number",
                    "name": "withdraw_locked_amount",
                    "null": "NO",
                    "comment": "提现锁定金额",
                    "default": "0.0000"
            },
            "pending_amount": {
                    "type": "number",
                    "name": "pending_amount",
                    "null": "YES",
                    "comment": "预约的还没有正式收入的",
                    "default": "0.0000"
            },
            "day": {
                    "type": "string",
                    "name": "day",
                    "null": "NO",
                    "comment": "收入时间, 最小为天",
                    "default": null
            },
            "created_at": {
                    "type": "string",
                    "name": "created_at",
                    "null": "NO",
                    "comment": "",
                    "default": "CURRENT_TIMESTAMP"
            },
            "updated_at": {
                    "type": "string",
                    "name": "updated_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get total_amount(){ return this.getData('total_amount');}
    set total_amount(v){ return this.setData('total_amount',v);}

    get deduction_amount(){ return this.getData('deduction_amount');}
    set deduction_amount(v){ return this.setData('deduction_amount',v);}

    get online_amount(){ return this.getData('online_amount');}
    set online_amount(v){ return this.setData('online_amount',v);}

    get commission_amount(){ return this.getData('commission_amount');}
    set commission_amount(v){ return this.setData('commission_amount',v);}

    get refund_amount(){ return this.getData('refund_amount');}
    set refund_amount(v){ return this.setData('refund_amount',v);}

    get withdraw_amount(){ return this.getData('withdraw_amount');}
    set withdraw_amount(v){ return this.setData('withdraw_amount',v);}

    get withdraw_locked_amount(){ return this.getData('withdraw_locked_amount');}
    set withdraw_locked_amount(v){ return this.setData('withdraw_locked_amount',v);}

    get pending_amount(){ return this.getData('pending_amount');}
    set pending_amount(v){ return this.setData('pending_amount',v);}

    get day(){ return this.getData('day');}
    set day(v){ return this.setData('day',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
