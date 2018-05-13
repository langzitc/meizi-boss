
/**
 * BeautyStoreEmployeeAppointmentEntity
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
            "pre_order_employee_id": {
                    "type": "number",
                    "name": "pre_order_employee_id",
                    "null": "YES",
                    "comment": "订单员工记录ID",
                    "default": "0"
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
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
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

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get pre_order_employee_id(){ return this.getData('pre_order_employee_id');}
    set pre_order_employee_id(v){ return this.setData('pre_order_employee_id',v);}

    get start_at(){ return this.getData('start_at');}
    set start_at(v){ return this.setData('start_at',v);}

    get duration(){ return this.getData('duration');}
    set duration(v){ return this.setData('duration',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
