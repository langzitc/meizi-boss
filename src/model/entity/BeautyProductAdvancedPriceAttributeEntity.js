
/**
 * BeautyProductAdvancedPriceAttributeEntity
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
            "price_id": {
                    "type": "number",
                    "name": "price_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "attribute_id": {
                    "type": "number",
                    "name": "attribute_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "attribute_value": {
                    "type": "number",
                    "name": "attribute_value",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get price_id(){ return this.getData('price_id');}
    set price_id(v){ return this.setData('price_id',v);}

    get attribute_id(){ return this.getData('attribute_id');}
    set attribute_id(v){ return this.setData('attribute_id',v);}

    get attribute_value(){ return this.getData('attribute_value');}
    set attribute_value(v){ return this.setData('attribute_value',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}


}
