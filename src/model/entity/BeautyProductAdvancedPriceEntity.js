
/**
 * BeautyProductAdvancedPriceEntity
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
            "job_title_id": {
                    "type": "number",
                    "name": "job_title_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "price": {
                    "type": "number",
                    "name": "price",
                    "null": "NO",
                    "comment": "价格",
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
            "special_price": {
                    "type": "number",
                    "name": "special_price",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "special_price_start_at": {
                    "type": "string",
                    "name": "special_price_start_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "special_price_end_at": {
                    "type": "string",
                    "name": "special_price_end_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "attribute_ids": {
                    "type": "string",
                    "name": "attribute_ids",
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

    get job_title_id(){ return this.getData('job_title_id');}
    set job_title_id(v){ return this.setData('job_title_id',v);}

    get price(){ return this.getData('price');}
    set price(v){ return this.setData('price',v);}

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

    get attribute_ids(){ return this.getData('attribute_ids');}
    set attribute_ids(v){ return this.setData('attribute_ids',v);}


}
