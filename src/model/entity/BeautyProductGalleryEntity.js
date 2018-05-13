
/**
 * BeautyProductGalleryEntity
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
            "image_path": {
                    "type": "string",
                    "name": "image_path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "is_basic": {
                    "type": "number",
                    "name": "is_basic",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get image_path(){ return this.getData('image_path');}
    set image_path(v){ return this.setData('image_path',v);}

    get is_basic(){ return this.getData('is_basic');}
    set is_basic(v){ return this.setData('is_basic',v);}


}
