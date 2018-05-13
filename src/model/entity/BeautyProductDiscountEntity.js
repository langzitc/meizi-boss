
/**
 * BeautyProductDiscountEntity
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
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "is_global": {
                    "type": "string",
                    "name": "is_global",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
            },
            "global_discount_type": {
                    "type": "string",
                    "name": "global_discount_type",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "global_discount_amount": {
                    "type": "number",
                    "name": "global_discount_amount",
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

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get is_global(){ return this.getData('is_global');}
    set is_global(v){ return this.setData('is_global',v);}

    get global_discount_type(){ return this.getData('global_discount_type');}
    set global_discount_type(v){ return this.setData('global_discount_type',v);}

    get global_discount_amount(){ return this.getData('global_discount_amount');}
    set global_discount_amount(v){ return this.setData('global_discount_amount',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
