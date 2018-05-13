
/**
 * BeautyProductCategoryEntity
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
            "category_id": {
                    "type": "number",
                    "name": "category_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get category_id(){ return this.getData('category_id');}
    set category_id(v){ return this.setData('category_id',v);}


}
