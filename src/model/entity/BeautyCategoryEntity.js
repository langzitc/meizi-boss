
/**
 * BeautyCategoryEntity
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
            "parent_id": {
                    "type": "number",
                    "name": "parent_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
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
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "type_code": {
                    "type": "string",
                    "name": "type_code",
                    "null": "NO",
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
            },
            "industry_id": {
                    "type": "number",
                    "name": "industry_id",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
            },
            "system_item_id": {
                    "type": "number",
                    "name": "system_item_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "department_id": {
                    "type": "number",
                    "name": "department_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "YES",
                    "comment": "对应服务的id",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get type_code(){ return this.getData('type_code');}
    set type_code(v){ return this.setData('type_code',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get industry_id(){ return this.getData('industry_id');}
    set industry_id(v){ return this.setData('industry_id',v);}

    get system_item_id(){ return this.getData('system_item_id');}
    set system_item_id(v){ return this.setData('system_item_id',v);}

    get department_id(){ return this.getData('department_id');}
    set department_id(v){ return this.setData('department_id',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}


}
