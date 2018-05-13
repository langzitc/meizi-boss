
/**
 * BeautySmsContentEntity
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
            "template_code": {
                    "type": "string",
                    "name": "template_code",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "content": {
                    "type": "string",
                    "name": "content",
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
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get template_code(){ return this.getData('template_code');}
    set template_code(v){ return this.setData('template_code',v);}

    get content(){ return this.getData('content');}
    set content(v){ return this.setData('content',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
