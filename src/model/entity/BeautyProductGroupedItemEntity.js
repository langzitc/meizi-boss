
/**
 * BeautyProductGroupedItemEntity
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
                    "default": null
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
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
            "sku": {
                    "type": "string",
                    "name": "sku",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "origin_price": {
                    "type": "string",
                    "name": "origin_price",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "price": {
                    "type": "number",
                    "name": "price",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "qty": {
                    "type": "number",
                    "name": "qty",
                    "null": "NO",
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
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "其它信息，比如当是属性定价产品时，attributes内容会放在该字段里",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get sku(){ return this.getData('sku');}
    set sku(v){ return this.setData('sku',v);}

    get origin_price(){ return this.getData('origin_price');}
    set origin_price(v){ return this.setData('origin_price',v);}

    get price(){ return this.getData('price');}
    set price(v){ return this.setData('price',v);}

    get qty(){ return this.getData('qty');}
    set qty(v){ return this.setData('qty',v);}

    get expired_at(){ return this.getData('expired_at');}
    set expired_at(v){ return this.setData('expired_at',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}


}
