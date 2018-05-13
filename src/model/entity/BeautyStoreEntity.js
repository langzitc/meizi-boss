
/**
 * BeautyStoreEntity
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
                    "default": "STORE NAME"
            },
            "parent_id": {
                    "type": "number",
                    "name": "parent_id",
                    "null": "NO",
                    "comment": "上级店铺",
                    "default": "0"
            },
            "member_id": {
                    "type": "number",
                    "name": "member_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "province_id": {
                    "type": "number",
                    "name": "province_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "city_id": {
                    "type": "number",
                    "name": "city_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "area_id": {
                    "type": "number",
                    "name": "area_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "address": {
                    "type": "string",
                    "name": "address",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "geo_location": {
                    "type": "string",
                    "name": "geo_location",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "logo_id": {
                    "type": "number",
                    "name": "logo_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "logo_path": {
                    "type": "string",
                    "name": "logo_path",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "contacts_name": {
                    "type": "string",
                    "name": "contacts_name",
                    "null": "YES",
                    "comment": "联系人",
                    "default": null
            },
            "contacts_mobile": {
                    "type": "string",
                    "name": "contacts_mobile",
                    "null": "YES",
                    "comment": "联系人电话",
                    "default": null
            },
            "contacts_qq": {
                    "type": "string",
                    "name": "contacts_qq",
                    "null": "YES",
                    "comment": "联系人QQ",
                    "default": null
            },
            "service_tel": {
                    "type": "string",
                    "name": "service_tel",
                    "null": "YES",
                    "comment": "客服电话",
                    "default": null
            },
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "其它信息,JSON 数据",
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
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get province_id(){ return this.getData('province_id');}
    set province_id(v){ return this.setData('province_id',v);}

    get city_id(){ return this.getData('city_id');}
    set city_id(v){ return this.setData('city_id',v);}

    get area_id(){ return this.getData('area_id');}
    set area_id(v){ return this.setData('area_id',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get address(){ return this.getData('address');}
    set address(v){ return this.setData('address',v);}

    get geo_location(){ return this.getData('geo_location');}
    set geo_location(v){ return this.setData('geo_location',v);}

    get logo_id(){ return this.getData('logo_id');}
    set logo_id(v){ return this.setData('logo_id',v);}

    get logo_path(){ return this.getData('logo_path');}
    set logo_path(v){ return this.setData('logo_path',v);}

    get contacts_name(){ return this.getData('contacts_name');}
    set contacts_name(v){ return this.setData('contacts_name',v);}

    get contacts_mobile(){ return this.getData('contacts_mobile');}
    set contacts_mobile(v){ return this.setData('contacts_mobile',v);}

    get contacts_qq(){ return this.getData('contacts_qq');}
    set contacts_qq(v){ return this.setData('contacts_qq',v);}

    get service_tel(){ return this.getData('service_tel');}
    set service_tel(v){ return this.setData('service_tel',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}


}
