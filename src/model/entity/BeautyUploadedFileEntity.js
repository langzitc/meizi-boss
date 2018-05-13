
/**
 * BeautyUploadedFileEntity
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
            "type": {
                    "type": "string",
                    "name": "type",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "path": {
                    "type": "string",
                    "name": "path",
                    "null": "YES",
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
            "md5": {
                    "type": "string",
                    "name": "md5",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "created_at": {
                    "type": "string",
                    "name": "created_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
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

    get type(){ return this.getData('type');}
    set type(v){ return this.setData('type',v);}

    get path(){ return this.getData('path');}
    set path(v){ return this.setData('path',v);}

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get md5(){ return this.getData('md5');}
    set md5(v){ return this.setData('md5',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
