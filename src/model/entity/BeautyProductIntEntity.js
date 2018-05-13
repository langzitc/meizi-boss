
/**
 * BeautyProductIntEntity
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
            "value": {
                    "type": "number",
                    "name": "value",
                    "null": "YES",
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
            "attribute_id": {
                    "type": "number",
                    "name": "attribute_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get value(){ return this.getData('value');}
    set value(v){ return this.setData('value',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get attribute_id(){ return this.getData('attribute_id');}
    set attribute_id(v){ return this.setData('attribute_id',v);}


}
