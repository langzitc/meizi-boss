
/**
 * BeautyStoreFlightEntity
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
            "flight_name": {
                    "type": "string",
                    "name": "flight_name",
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
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "start_at": {
                    "type": "string",
                    "name": "start_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "end_at": {
                    "type": "string",
                    "name": "end_at",
                    "null": "NO",
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

    get flight_name(){ return this.getData('flight_name');}
    set flight_name(v){ return this.setData('flight_name',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get start_at(){ return this.getData('start_at');}
    set start_at(v){ return this.setData('start_at',v);}

    get end_at(){ return this.getData('end_at');}
    set end_at(v){ return this.setData('end_at',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
