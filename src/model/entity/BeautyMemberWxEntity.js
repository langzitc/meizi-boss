
/**
 * BeautyMemberWxEntity
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
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "open_id": {
                    "type": "string",
                    "name": "open_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "union_id": {
                    "type": "string",
                    "name": "union_id",
                    "null": "NO",
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

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get open_id(){ return this.getData('open_id');}
    set open_id(v){ return this.setData('open_id',v);}

    get union_id(){ return this.getData('union_id');}
    set union_id(v){ return this.setData('union_id',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
