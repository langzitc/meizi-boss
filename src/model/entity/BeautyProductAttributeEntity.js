
/**
 * BeautyProductAttributeEntity
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
            "product_type": {
                    "type": "string",
                    "name": "product_type",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "frontend_label": {
                    "type": "string",
                    "name": "frontend_label",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "attribute_code": {
                    "type": "string",
                    "name": "attribute_code",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "backend_type": {
                    "type": "string",
                    "name": "backend_type",
                    "null": "NO",
                    "comment": "int\/decimal\/datetime\/varchar\/text",
                    "default": null
            },
            "input_type": {
                    "type": "string",
                    "name": "input_type",
                    "null": "NO",
                    "comment": "",
                    "default": "text"
            },
            "source_model": {
                    "type": "string",
                    "name": "source_model",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
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
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get product_type(){ return this.getData('product_type');}
    set product_type(v){ return this.setData('product_type',v);}

    get frontend_label(){ return this.getData('frontend_label');}
    set frontend_label(v){ return this.setData('frontend_label',v);}

    get attribute_code(){ return this.getData('attribute_code');}
    set attribute_code(v){ return this.setData('attribute_code',v);}

    get backend_type(){ return this.getData('backend_type');}
    set backend_type(v){ return this.setData('backend_type',v);}

    get input_type(){ return this.getData('input_type');}
    set input_type(v){ return this.setData('input_type',v);}

    get source_model(){ return this.getData('source_model');}
    set source_model(v){ return this.setData('source_model',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
