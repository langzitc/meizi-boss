
/**
 * BeautyStoreConfigEntity
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
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "path": {
                    "type": "string",
                    "name": "path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "value": {
                    "type": "string",
                    "name": "value",
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

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get path(){ return this.getData('path');}
    set path(v){ return this.setData('path',v);}

    get value(){ return this.getData('value');}
    set value(v){ return this.setData('value',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
