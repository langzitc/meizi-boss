
/**
 * BeautySmsEntity
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
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "content_id": {
                    "type": "number",
                    "name": "content_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "member_id": {
                    "type": "number",
                    "name": "member_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get mobile(){ return this.getData('mobile');}
    set mobile(v){ return this.setData('mobile',v);}

    get content_id(){ return this.getData('content_id');}
    set content_id(v){ return this.setData('content_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}


}
