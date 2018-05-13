
/**
 * BeautyStoreMemberAmountHistoryEntity
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
            "store_member_id": {
                    "type": "number",
                    "name": "store_member_id",
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
                    "comment": "发生店铺ID",
                    "default": null
            },
            "entity_id": {
                    "type": "number",
                    "name": "entity_id",
                    "null": "YES",
                    "comment": "对应的记录id,对应订单时为订单ID,对应卡券的时候为卡券ID",
                    "default": "0"
            },
            "charge_type": {
                    "type": "string",
                    "name": "charge_type",
                    "null": "NO",
                    "comment": "记录类型",
                    "default": null
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "变动金额",
                    "default": "0.00"
            },
            "rest_amount": {
                    "type": "number",
                    "name": "rest_amount",
                    "null": "NO",
                    "comment": "剩余金额",
                    "default": "0.00"
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
            },
            "comment": {
                    "type": "string",
                    "name": "comment",
                    "null": "YES",
                    "comment": "",
                    "default": ""
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get entity_id(){ return this.getData('entity_id');}
    set entity_id(v){ return this.setData('entity_id',v);}

    get charge_type(){ return this.getData('charge_type');}
    set charge_type(v){ return this.setData('charge_type',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get rest_amount(){ return this.getData('rest_amount');}
    set rest_amount(v){ return this.setData('rest_amount',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get comment(){ return this.getData('comment');}
    set comment(v){ return this.setData('comment',v);}


}
