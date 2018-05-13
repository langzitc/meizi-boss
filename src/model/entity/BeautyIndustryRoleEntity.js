
/**
 * BeautyIndustryRoleEntity
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
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "YES",
                    "comment": "系统默认定义为0",
                    "default": "0"
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "YES",
                    "comment": "系统默认定义为0",
                    "default": "0"
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "code": {
                    "type": "string",
                    "name": "code",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "pid": {
                    "type": "number",
                    "name": "pid",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "industry_id": {
                    "type": "number",
                    "name": "industry_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
            },
            "sort": {
                    "type": "number",
                    "name": "sort",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
            },
            "menu_auth": {
                    "type": "string",
                    "name": "menu_auth",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "description": {
                    "type": "string",
                    "name": "description",
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

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get code(){ return this.getData('code');}
    set code(v){ return this.setData('code',v);}

    get pid(){ return this.getData('pid');}
    set pid(v){ return this.setData('pid',v);}

    get industry_id(){ return this.getData('industry_id');}
    set industry_id(v){ return this.setData('industry_id',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get sort(){ return this.getData('sort');}
    set sort(v){ return this.setData('sort',v);}

    get menu_auth(){ return this.getData('menu_auth');}
    set menu_auth(v){ return this.setData('menu_auth',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
