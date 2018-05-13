
/**
 * BeautyProductEntity
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
            "type_code": {
                    "type": "string",
                    "name": "type_code",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "sku": {
                    "type": "string",
                    "name": "sku",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "duration": {
                    "type": "number",
                    "name": "duration",
                    "null": "YES",
                    "comment": "持续时间: 分钟",
                    "default": "0"
            },
            "original_price": {
                    "type": "number",
                    "name": "original_price",
                    "null": "YES",
                    "comment": "",
                    "default": "0.00"
            },
            "price": {
                    "type": "number",
                    "name": "price",
                    "null": "NO",
                    "comment": "",
                    "default": "0.00"
            },
            "is_shown_on_store": {
                    "type": "number",
                    "name": "is_shown_on_store",
                    "null": "YES",
                    "comment": "",
                    "default": "0.00"
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "short_description": {
                    "type": "string",
                    "name": "short_description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "member_id": {
                    "type": "number",
                    "name": "member_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "YES",
                    "comment": "",
                    "default": "1"
            },
            "expired_at": {
                    "type": "string",
                    "name": "expired_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "created_at": {
                    "type": "string",
                    "name": "created_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "updated_at": {
                    "type": "string",
                    "name": "updated_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "special_price": {
                    "type": "number",
                    "name": "special_price",
                    "null": "YES",
                    "comment": "特价",
                    "default": "0.0000"
            },
            "special_price_start_at": {
                    "type": "string",
                    "name": "special_price_start_at",
                    "null": "YES",
                    "comment": "特价开始时间",
                    "default": null
            },
            "special_price_end_at": {
                    "type": "string",
                    "name": "special_price_end_at",
                    "null": "YES",
                    "comment": "特价结束时间",
                    "default": null
            },
            "start_at": {
                    "type": "string",
                    "name": "start_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "term_of_validity": {
                    "type": "number",
                    "name": "term_of_validity",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get type_code(){ return this.getData('type_code');}
    set type_code(v){ return this.setData('type_code',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get sku(){ return this.getData('sku');}
    set sku(v){ return this.setData('sku',v);}

    get duration(){ return this.getData('duration');}
    set duration(v){ return this.setData('duration',v);}

    get original_price(){ return this.getData('original_price');}
    set original_price(v){ return this.setData('original_price',v);}

    get price(){ return this.getData('price');}
    set price(v){ return this.setData('price',v);}

    get is_shown_on_store(){ return this.getData('is_shown_on_store');}
    set is_shown_on_store(v){ return this.setData('is_shown_on_store',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get short_description(){ return this.getData('short_description');}
    set short_description(v){ return this.setData('short_description',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get expired_at(){ return this.getData('expired_at');}
    set expired_at(v){ return this.setData('expired_at',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get special_price(){ return this.getData('special_price');}
    set special_price(v){ return this.setData('special_price',v);}

    get special_price_start_at(){ return this.getData('special_price_start_at');}
    set special_price_start_at(v){ return this.setData('special_price_start_at',v);}

    get special_price_end_at(){ return this.getData('special_price_end_at');}
    set special_price_end_at(v){ return this.setData('special_price_end_at',v);}

    get start_at(){ return this.getData('start_at');}
    set start_at(v){ return this.setData('start_at',v);}

    get term_of_validity(){ return this.getData('term_of_validity');}
    set term_of_validity(v){ return this.setData('term_of_validity',v);}


}
