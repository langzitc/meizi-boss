
/**
 * BeautyProductEmployeeCommissionEntity
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
            "is_member_type_global": {
                    "type": "string",
                    "name": "is_member_type_global",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "is_employee_type_global": {
                    "type": "string",
                    "name": "is_employee_type_global",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
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

    get is_member_type_global(){ return this.getData('is_member_type_global');}
    set is_member_type_global(v){ return this.setData('is_member_type_global',v);}

    get is_employee_type_global(){ return this.getData('is_employee_type_global');}
    set is_employee_type_global(v){ return this.setData('is_employee_type_global',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
