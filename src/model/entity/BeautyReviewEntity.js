
/**
 * BeautyReviewEntity
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
                    "comment": "对什么的评价: 0,: 员工",
                    "default": "0"
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
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
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "order_id": {
                    "type": "number",
                    "name": "order_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "content": {
                    "type": "string",
                    "name": "content",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "reply": {
                    "type": "string",
                    "name": "reply",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "reply_at": {
                    "type": "string",
                    "name": "reply_at",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "reply_manager_id": {
                    "type": "number",
                    "name": "reply_manager_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "employee_id": {
                    "type": "number",
                    "name": "employee_id",
                    "null": "YES",
                    "comment": "员工ID",
                    "default": "0"
            },
            "rate": {
                    "type": "number",
                    "name": "rate",
                    "null": "YES",
                    "comment": "",
                    "default": "0.00"
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

    get type(){ return this.getData('type');}
    set type(v){ return this.setData('type',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get order_id(){ return this.getData('order_id');}
    set order_id(v){ return this.setData('order_id',v);}

    get content(){ return this.getData('content');}
    set content(v){ return this.setData('content',v);}

    get reply(){ return this.getData('reply');}
    set reply(v){ return this.setData('reply',v);}

    get reply_at(){ return this.getData('reply_at');}
    set reply_at(v){ return this.setData('reply_at',v);}

    get reply_manager_id(){ return this.getData('reply_manager_id');}
    set reply_manager_id(v){ return this.setData('reply_manager_id',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get rate(){ return this.getData('rate');}
    set rate(v){ return this.setData('rate',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
