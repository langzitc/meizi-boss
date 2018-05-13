
/**
 * BeautyStoreMemberCardEntity
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
            "number": {
                    "type": "string",
                    "name": "number",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "YES",
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
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "",
                    "default": "0.00"
            },
            "given_amount": {
                    "type": "number",
                    "name": "given_amount",
                    "null": "NO",
                    "comment": "赠送金",
                    "default": "0.00"
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "NO",
                    "comment": "会员卡产品id,即卡的类型",
                    "default": null
            },
            "expired_at": {
                    "type": "string",
                    "name": "expired_at",
                    "null": "YES",
                    "comment": "会员卡过期时间",
                    "default": null
            },
            "password": {
                    "type": "string",
                    "name": "password",
                    "null": "YES",
                    "comment": "会员卡密码",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "YES",
                    "comment": "开卡门店ID",
                    "default": null
            },
            "admin_id": {
                    "type": "number",
                    "name": "admin_id",
                    "null": "YES",
                    "comment": "开卡管理员ID",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "discount_amount_for_service_item": {
                    "type": "number",
                    "name": "discount_amount_for_service_item",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "discount_amount_for_service_group": {
                    "type": "number",
                    "name": "discount_amount_for_service_group",
                    "null": "YES",
                    "comment": "",
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

    get number(){ return this.getData('number');}
    set number(v){ return this.setData('number',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get given_amount(){ return this.getData('given_amount');}
    set given_amount(v){ return this.setData('given_amount',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get expired_at(){ return this.getData('expired_at');}
    set expired_at(v){ return this.setData('expired_at',v);}

    get password(){ return this.getData('password');}
    set password(v){ return this.setData('password',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get admin_id(){ return this.getData('admin_id');}
    set admin_id(v){ return this.setData('admin_id',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get discount_amount_for_service_item(){ return this.getData('discount_amount_for_service_item');}
    set discount_amount_for_service_item(v){ return this.setData('discount_amount_for_service_item',v);}

    get discount_amount_for_service_group(){ return this.getData('discount_amount_for_service_group');}
    set discount_amount_for_service_group(v){ return this.setData('discount_amount_for_service_group',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
