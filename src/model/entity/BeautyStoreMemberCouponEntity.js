
/**
 * BeautyStoreMemberCouponEntity
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
            "title": {
                    "type": "string",
                    "name": "title",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "YES",
                    "comment": "代金券产品ID(暂定)",
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
                    "null": "YES",
                    "comment": "是否是在指定的店铺有用, 如果store_id为空，则在所有的店铺有用",
                    "default": "0"
            },
            "store_member_id": {
                    "type": "number",
                    "name": "store_member_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "NO",
                    "comment": "是否已经使用, 0:未使用,1:已经使用",
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
            },
            "expired_at": {
                    "type": "string",
                    "name": "expired_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "当是折扣券时，为折扣大小",
                    "default": "0.00"
            },
            "discount_type": {
                    "type": "number",
                    "name": "discount_type",
                    "null": "NO",
                    "comment": "减价类型: 0,现金券, 1: 折扣券",
                    "default": "0"
            },
            "conditions": {
                    "type": "string",
                    "name": "conditions",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "comment": {
                    "type": "string",
                    "name": "comment",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "is_deleted": {
                    "type": "number",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get title(){ return this.getData('title');}
    set title(v){ return this.setData('title',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get expired_at(){ return this.getData('expired_at');}
    set expired_at(v){ return this.setData('expired_at',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get discount_type(){ return this.getData('discount_type');}
    set discount_type(v){ return this.setData('discount_type',v);}

    get conditions(){ return this.getData('conditions');}
    set conditions(v){ return this.setData('conditions',v);}

    get comment(){ return this.getData('comment');}
    set comment(v){ return this.setData('comment',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}


}
