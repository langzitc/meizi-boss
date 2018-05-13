
/**
 * BeautyOrderPreOrderEmployeeEntity
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
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "employee_id": {
                    "type": "number",
                    "name": "employee_id",
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
            "item_id": {
                    "type": "number",
                    "name": "item_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "start_at": {
                    "type": "string",
                    "name": "start_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "duration": {
                    "type": "number",
                    "name": "duration",
                    "null": "NO",
                    "comment": "持续时长：分钟",
                    "default": null
            },
            "end_at": {
                    "type": "string",
                    "name": "end_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
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

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get order_id(){ return this.getData('order_id');}
    set order_id(v){ return this.setData('order_id',v);}

    get item_id(){ return this.getData('item_id');}
    set item_id(v){ return this.setData('item_id',v);}

    get start_at(){ return this.getData('start_at');}
    set start_at(v){ return this.setData('start_at',v);}

    get duration(){ return this.getData('duration');}
    set duration(v){ return this.setData('duration',v);}

    get end_at(){ return this.getData('end_at');}
    set end_at(v){ return this.setData('end_at',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
