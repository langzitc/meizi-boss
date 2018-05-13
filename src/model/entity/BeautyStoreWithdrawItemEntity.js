
/**
 * BeautyStoreWithdrawItemEntity
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
            "withdraw_id": {
                    "type": "number",
                    "name": "withdraw_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "daily_revenue_id": {
                    "type": "number",
                    "name": "daily_revenue_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "在某一天的收入上的提现金额",
                    "default": null
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "状态: 0, 已经锁定金额, 1:已经完成提现,2: 取消",
                    "default": "0"
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

    get withdraw_id(){ return this.getData('withdraw_id');}
    set withdraw_id(v){ return this.setData('withdraw_id',v);}

    get daily_revenue_id(){ return this.getData('daily_revenue_id');}
    set daily_revenue_id(v){ return this.setData('daily_revenue_id',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
