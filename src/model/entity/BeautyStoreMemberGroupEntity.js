
/**
 * BeautyStoreMemberGroupEntity
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
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
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
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "experience_value": {
                    "type": "number",
                    "name": "experience_value",
                    "null": "NO",
                    "comment": "经验值",
                    "default": null
            },
            "discount_on_service": {
                    "type": "number",
                    "name": "discount_on_service",
                    "null": "YES",
                    "comment": "服务折扣",
                    "default": null
            },
            "discount_on_product": {
                    "type": "number",
                    "name": "discount_on_product",
                    "null": "YES",
                    "comment": "产品折扣",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
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
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get experience_value(){ return this.getData('experience_value');}
    set experience_value(v){ return this.setData('experience_value',v);}

    get discount_on_service(){ return this.getData('discount_on_service');}
    set discount_on_service(v){ return this.setData('discount_on_service',v);}

    get discount_on_product(){ return this.getData('discount_on_product');}
    set discount_on_product(v){ return this.setData('discount_on_product',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
