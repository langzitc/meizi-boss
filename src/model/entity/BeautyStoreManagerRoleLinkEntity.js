
/**
 * BeautyStoreManagerRoleLinkEntity
 */
import Utils from './../Utils';
import AbstractModel from '../AbstractModel';
export default class extends AbstractModel {
    FIELDS () { 
        return  {
            "id": {
                    "type": "number",
                    "name": "id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "manager_id": {
                    "type": "number",
                    "name": "manager_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "role_id": {
                    "type": "number",
                    "name": "role_id",
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
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get manager_id(){ return this.getData('manager_id');}
    set manager_id(v){ return this.setData('manager_id',v);}

    get role_id(){ return this.getData('role_id');}
    set role_id(v){ return this.setData('role_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}


}
