
/**
 * BeautyOrderPreOrderEntity
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
            "order_id": {
                    "type": "number",
                    "name": "order_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "appointment_start_at": {
                    "type": "string",
                    "name": "appointment_start_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "appointment_end_at": {
                    "type": "string",
                    "name": "appointment_end_at",
                    "null": "YES",
                    "comment": "预计服务结束时间",
                    "default": null
            },
            "appointment_from": {
                    "type": "string",
                    "name": "appointment_from",
                    "null": "YES",
                    "comment": "预约渠道: 0: 线下预约，1：线上预约",
                    "default": null
            },
            "appointment_status": {
                    "type": "number",
                    "name": "appointment_status",
                    "null": "NO",
                    "comment": "0:等实施，1：已实施，2：已经取消，3： 爽约",
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

    get order_id(){ return this.getData('order_id');}
    set order_id(v){ return this.setData('order_id',v);}

    get appointment_start_at(){ return this.getData('appointment_start_at');}
    set appointment_start_at(v){ return this.setData('appointment_start_at',v);}

    get appointment_end_at(){ return this.getData('appointment_end_at');}
    set appointment_end_at(v){ return this.setData('appointment_end_at',v);}

    get appointment_from(){ return this.getData('appointment_from');}
    set appointment_from(v){ return this.setData('appointment_from',v);}

    get appointment_status(){ return this.getData('appointment_status');}
    set appointment_status(v){ return this.setData('appointment_status',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
