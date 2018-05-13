
/**
 * BeautyStoreWithdrawEntity
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
            "store_manager_id": {
                    "type": "number",
                    "name": "store_manager_id",
                    "null": "NO",
                    "comment": "申请管理员,为0时为店铺创建者",
                    "default": "0"
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "提现金额",
                    "default": null
            },
            "transaction_number": {
                    "type": "string",
                    "name": "transaction_number",
                    "null": "YES",
                    "comment": "银行交易流水号",
                    "default": null
            },
            "completed_at": {
                    "type": "string",
                    "name": "completed_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "状态: 0, 已经申请,2:处理中,1:完成,3:取消,4:拒绝",
                    "default": "0"
            },
            "comment": {
                    "type": "string",
                    "name": "comment",
                    "null": "YES",
                    "comment": "备注",
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

    get store_manager_id(){ return this.getData('store_manager_id');}
    set store_manager_id(v){ return this.setData('store_manager_id',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get transaction_number(){ return this.getData('transaction_number');}
    set transaction_number(v){ return this.setData('transaction_number',v);}

    get completed_at(){ return this.getData('completed_at');}
    set completed_at(v){ return this.setData('completed_at',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get comment(){ return this.getData('comment');}
    set comment(v){ return this.setData('comment',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
