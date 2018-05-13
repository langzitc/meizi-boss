
/**
 * BeautyOrderEmployeeEntity
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
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "item_id": {
                    "type": "number",
                    "name": "item_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "employee_id": {
                    "type": "number",
                    "name": "employee_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "assigned_type": {
                    "type": "string",
                    "name": "assigned_type",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "commission_type": {
                    "type": "number",
                    "name": "commission_type",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "commission_amount": {
                    "type": "number",
                    "name": "commission_amount",
                    "null": "YES",
                    "comment": "提成配置上的值",
                    "default": null
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "YES",
                    "comment": "计算后员工应得提成",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
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

    get item_id(){ return this.getData('item_id');}
    set item_id(v){ return this.setData('item_id',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get assigned_type(){ return this.getData('assigned_type');}
    set assigned_type(v){ return this.setData('assigned_type',v);}

    get commission_type(){ return this.getData('commission_type');}
    set commission_type(v){ return this.setData('commission_type',v);}

    get commission_amount(){ return this.getData('commission_amount');}
    set commission_amount(v){ return this.setData('commission_amount',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}


}
