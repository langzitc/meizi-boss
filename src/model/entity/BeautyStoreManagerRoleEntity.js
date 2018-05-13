
/**
 * BeautyStoreManagerRoleEntity
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
            "name": {
                    "type": "string",
                    "name": "name",
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
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "parent_id": {
                    "type": "number",
                    "name": "parent_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "creator": {
                    "type": "number",
                    "name": "creator",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "menus": {
                    "type": "string",
                    "name": "menus",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
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

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get creator(){ return this.getData('creator');}
    set creator(v){ return this.setData('creator',v);}

    get menus(){ return this.getData('menus');}
    set menus(v){ return this.setData('menus',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
