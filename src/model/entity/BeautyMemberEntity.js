
/**
 * BeautyMemberEntity
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
            "mobile": {
                    "type": "string",
                    "name": "mobile",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "email": {
                    "type": "string",
                    "name": "email",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "password": {
                    "type": "string",
                    "name": "password",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "nick_name": {
                    "type": "string",
                    "name": "nick_name",
                    "null": "NO",
                    "comment": "",
                    "default": ""
            },
            "brand_name": {
                    "type": "string",
                    "name": "brand_name",
                    "null": "YES",
                    "comment": "品牌名",
                    "default": null
            },
            "birthday": {
                    "type": "string",
                    "name": "birthday",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "gender": {
                    "type": "string",
                    "name": "gender",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "original_store_id": {
                    "type": "number",
                    "name": "original_store_id",
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
            "avatar_id": {
                    "type": "number",
                    "name": "avatar_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "avatar": {
                    "type": "string",
                    "name": "avatar",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "random_password": {
                    "type": "string",
                    "name": "random_password",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "address": {
                    "type": "string",
                    "name": "address",
                    "null": "NO",
                    "comment": "",
                    "default": ""
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
            "im_qq": {
                    "type": "string",
                    "name": "im_qq",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get mobile(){ return this.getData('mobile');}
    set mobile(v){ return this.setData('mobile',v);}

    get email(){ return this.getData('email');}
    set email(v){ return this.setData('email',v);}

    get password(){ return this.getData('password');}
    set password(v){ return this.setData('password',v);}

    get nick_name(){ return this.getData('nick_name');}
    set nick_name(v){ return this.setData('nick_name',v);}

    get brand_name(){ return this.getData('brand_name');}
    set brand_name(v){ return this.setData('brand_name',v);}

    get birthday(){ return this.getData('birthday');}
    set birthday(v){ return this.setData('birthday',v);}

    get gender(){ return this.getData('gender');}
    set gender(v){ return this.setData('gender',v);}

    get original_store_id(){ return this.getData('original_store_id');}
    set original_store_id(v){ return this.setData('original_store_id',v);}

    get province_id(){ return this.getData('province_id');}
    set province_id(v){ return this.setData('province_id',v);}

    get city_id(){ return this.getData('city_id');}
    set city_id(v){ return this.setData('city_id',v);}

    get area_id(){ return this.getData('area_id');}
    set area_id(v){ return this.setData('area_id',v);}

    get avatar_id(){ return this.getData('avatar_id');}
    set avatar_id(v){ return this.setData('avatar_id',v);}

    get avatar(){ return this.getData('avatar');}
    set avatar(v){ return this.setData('avatar',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get random_password(){ return this.getData('random_password');}
    set random_password(v){ return this.setData('random_password',v);}

    get address(){ return this.getData('address');}
    set address(v){ return this.setData('address',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get im_qq(){ return this.getData('im_qq');}
    set im_qq(v){ return this.setData('im_qq',v);}


}
