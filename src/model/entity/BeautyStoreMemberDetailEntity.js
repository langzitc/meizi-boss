
/**
 * BeautyStoreMemberDetailEntity
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
            "store_member_id": {
                    "type": "number",
                    "name": "store_member_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "height": {
                    "type": "number",
                    "name": "height",
                    "null": "YES",
                    "comment": "厘米",
                    "default": "0"
            },
            "weight": {
                    "type": "number",
                    "name": "weight",
                    "null": "YES",
                    "comment": "KG",
                    "default": "0"
            },
            "id_number": {
                    "type": "string",
                    "name": "id_number",
                    "null": "YES",
                    "comment": "",
                    "default": ""
            },
            "job": {
                    "type": "string",
                    "name": "job",
                    "null": "YES",
                    "comment": "职业",
                    "default": ""
            },
            "is_married": {
                    "type": "number",
                    "name": "is_married",
                    "null": "YES",
                    "comment": "职业",
                    "default": "0"
            },
            "blood_type": {
                    "type": "string",
                    "name": "blood_type",
                    "null": "YES",
                    "comment": "血型",
                    "default": ""
            },
            "hobbies": {
                    "type": "string",
                    "name": "hobbies",
                    "null": "YES",
                    "comment": "爱好",
                    "default": null
            },
            "home_tel": {
                    "type": "string",
                    "name": "home_tel",
                    "null": "YES",
                    "comment": "爱好",
                    "default": ""
            },
            "address": {
                    "type": "string",
                    "name": "address",
                    "null": "YES",
                    "comment": "爱好",
                    "default": null
            },
            "comment": {
                    "type": "string",
                    "name": "comment",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "create_time": {
                    "type": "string",
                    "name": "create_time",
                    "null": "NO",
                    "comment": "",
                    "default": "CURRENT_TIMESTAMP"
            },
            "update_time": {
                    "type": "string",
                    "name": "update_time",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get height(){ return this.getData('height');}
    set height(v){ return this.setData('height',v);}

    get weight(){ return this.getData('weight');}
    set weight(v){ return this.setData('weight',v);}

    get id_number(){ return this.getData('id_number');}
    set id_number(v){ return this.setData('id_number',v);}

    get job(){ return this.getData('job');}
    set job(v){ return this.setData('job',v);}

    get is_married(){ return this.getData('is_married');}
    set is_married(v){ return this.setData('is_married',v);}

    get blood_type(){ return this.getData('blood_type');}
    set blood_type(v){ return this.setData('blood_type',v);}

    get hobbies(){ return this.getData('hobbies');}
    set hobbies(v){ return this.setData('hobbies',v);}

    get home_tel(){ return this.getData('home_tel');}
    set home_tel(v){ return this.setData('home_tel',v);}

    get address(){ return this.getData('address');}
    set address(v){ return this.setData('address',v);}

    get comment(){ return this.getData('comment');}
    set comment(v){ return this.setData('comment',v);}

    get create_time(){ return this.getData('create_time');}
    set create_time(v){ return this.setData('create_time',v);}

    get update_time(){ return this.getData('update_time');}
    set update_time(v){ return this.setData('update_time',v);}


}
