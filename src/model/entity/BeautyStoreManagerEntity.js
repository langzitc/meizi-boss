
/**
 * BeautyStoreManagerEntity
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
            "member_id": {
                    "type": "number",
                    "name": "member_id",
                    "null": "YES",
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
            "phone": {
                    "type": "string",
                    "name": "phone",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "role_id": {
                    "type": "number",
                    "name": "role_id",
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
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "YES",
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

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get phone(){ return this.getData('phone');}
    set phone(v){ return this.setData('phone',v);}

    get role_id(){ return this.getData('role_id');}
    set role_id(v){ return this.setData('role_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
