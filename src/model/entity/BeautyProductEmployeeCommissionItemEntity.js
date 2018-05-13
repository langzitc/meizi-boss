
/**
 * BeautyProductEmployeeCommissionItemEntity
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
            "product_employee_commission_id": {
                    "type": "number",
                    "name": "product_employee_commission_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "employee_job_title_id": {
                    "type": "number",
                    "name": "employee_job_title_id",
                    "null": "NO",
                    "comment": "职位",
                    "default": "0"
            },
            "member_type": {
                    "type": "number",
                    "name": "member_type",
                    "null": "NO",
                    "comment": "顾客类型:1:散客,2: 会员,3:拓客奖励",
                    "default": "0"
            },
            "assigned_type": {
                    "type": "number",
                    "name": "assigned_type",
                    "null": "NO",
                    "comment": "服务方式:0,统一设置, 1:指定,2: 未指定,3:内创,4:常规",
                    "default": "0"
            },
            "member_card_operation": {
                    "type": "number",
                    "name": "member_card_operation",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "commission_type": {
                    "type": "number",
                    "name": "commission_type",
                    "null": "NO",
                    "comment": "提成方式,0: 固定金额,1: 百分比",
                    "default": null
            },
            "commission_amount": {
                    "type": "number",
                    "name": "commission_amount",
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

    get product_employee_commission_id(){ return this.getData('product_employee_commission_id');}
    set product_employee_commission_id(v){ return this.setData('product_employee_commission_id',v);}

    get employee_job_title_id(){ return this.getData('employee_job_title_id');}
    set employee_job_title_id(v){ return this.setData('employee_job_title_id',v);}

    get member_type(){ return this.getData('member_type');}
    set member_type(v){ return this.setData('member_type',v);}

    get assigned_type(){ return this.getData('assigned_type');}
    set assigned_type(v){ return this.setData('assigned_type',v);}

    get member_card_operation(){ return this.getData('member_card_operation');}
    set member_card_operation(v){ return this.setData('member_card_operation',v);}

    get commission_type(){ return this.getData('commission_type');}
    set commission_type(v){ return this.setData('commission_type',v);}

    get commission_amount(){ return this.getData('commission_amount');}
    set commission_amount(v){ return this.setData('commission_amount',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
