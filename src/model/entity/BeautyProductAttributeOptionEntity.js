
/**
 * BeautyProductAttributeOptionEntity
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
            "attribute_id": {
                    "type": "number",
                    "name": "attribute_id",
                    "null": "YES",
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
            "value": {
                    "type": "string",
                    "name": "value",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get attribute_id(){ return this.getData('attribute_id');}
    set attribute_id(v){ return this.setData('attribute_id',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get value(){ return this.getData('value');}
    set value(v){ return this.setData('value',v);}


}
