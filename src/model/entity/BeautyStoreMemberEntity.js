
/**
 * BeautyStoreMemberEntity
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
            "member_id": {
                    "type": "number",
                    "name": "member_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "mobile": {
                    "type": "string",
                    "name": "mobile",
                    "null": "YES",
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
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "group_id": {
                    "type": "number",
                    "name": "group_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "gender": {
                    "type": "string",
                    "name": "gender",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "number": {
                    "type": "string",
                    "name": "number",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "source": {
                    "type": "string",
                    "name": "source",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "帐户余额",
                    "default": "0.00"
            },
            "total_spent_amount": {
                    "type": "number",
                    "name": "total_spent_amount",
                    "null": "NO",
                    "comment": "累计消费",
                    "default": "0.00"
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "last_service_time": {
                    "type": "string",
                    "name": "last_service_time",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "has_grouped_service": {
                    "type": "string",
                    "name": "has_grouped_service",
                    "null": "YES",
                    "comment": "是否订购有套餐",
                    "default": "0"
            },
            "avatar": {
                    "type": "string",
                    "name": "avatar",
                    "null": "YES",
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
            "created_at": {
                    "type": "string",
                    "name": "created_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "last_order_at": {
                    "type": "string",
                    "name": "last_order_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "birthday": {
                    "type": "string",
                    "name": "birthday",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get mobile(){ return this.getData('mobile');}
    set mobile(v){ return this.setData('mobile',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get group_id(){ return this.getData('group_id');}
    set group_id(v){ return this.setData('group_id',v);}

    get gender(){ return this.getData('gender');}
    set gender(v){ return this.setData('gender',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get number(){ return this.getData('number');}
    set number(v){ return this.setData('number',v);}

    get source(){ return this.getData('source');}
    set source(v){ return this.setData('source',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get total_spent_amount(){ return this.getData('total_spent_amount');}
    set total_spent_amount(v){ return this.setData('total_spent_amount',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get last_service_time(){ return this.getData('last_service_time');}
    set last_service_time(v){ return this.setData('last_service_time',v);}

    get has_grouped_service(){ return this.getData('has_grouped_service');}
    set has_grouped_service(v){ return this.setData('has_grouped_service',v);}

    get avatar(){ return this.getData('avatar');}
    set avatar(v){ return this.setData('avatar',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get last_order_at(){ return this.getData('last_order_at');}
    set last_order_at(v){ return this.setData('last_order_at',v);}

    get birthday(){ return this.getData('birthday');}
    set birthday(v){ return this.setData('birthday',v);}


}
