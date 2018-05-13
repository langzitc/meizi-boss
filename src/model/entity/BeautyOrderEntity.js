
/**
 * BeautyOrderEntity
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
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "customer_name": {
                    "type": "string",
                    "name": "customer_name",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "trans_number": {
                    "type": "string",
                    "name": "trans_number",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "status": {
                    "type": "string",
                    "name": "status",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_member_id": {
                    "type": "number",
                    "name": "store_member_id",
                    "null": "YES",
                    "comment": "û",
                    "default": "0"
            },
            "order_type": {
                    "type": "string",
                    "name": "order_type",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "member_type": {
                    "type": "string",
                    "name": "member_type",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "employee_id": {
                    "type": "number",
                    "name": "employee_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "discount_amount": {
                    "type": "number",
                    "name": "discount_amount",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "grand_total": {
                    "type": "number",
                    "name": "grand_total",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "commission_amount": {
                    "type": "number",
                    "name": "commission_amount",
                    "null": "YES",
                    "comment": "订单总提成",
                    "default": "0.0000"
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "store_manager_id": {
                    "type": "number",
                    "name": "store_manager_id",
                    "null": "YES",
                    "comment": "操作管理员ID, 如果是店铺创建者操作的则为0",
                    "default": "0"
            },
            "department_id": {
                    "type": "number",
                    "name": "department_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
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
            },
            "is_reviewed": {
                    "type": "number",
                    "name": "is_reviewed",
                    "null": "YES",
                    "comment": "是否已经评价",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get mobile(){ return this.getData('mobile');}
    set mobile(v){ return this.setData('mobile',v);}

    get customer_name(){ return this.getData('customer_name');}
    set customer_name(v){ return this.setData('customer_name',v);}

    get trans_number(){ return this.getData('trans_number');}
    set trans_number(v){ return this.setData('trans_number',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get order_type(){ return this.getData('order_type');}
    set order_type(v){ return this.setData('order_type',v);}

    get member_type(){ return this.getData('member_type');}
    set member_type(v){ return this.setData('member_type',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get discount_amount(){ return this.getData('discount_amount');}
    set discount_amount(v){ return this.setData('discount_amount',v);}

    get grand_total(){ return this.getData('grand_total');}
    set grand_total(v){ return this.setData('grand_total',v);}

    get commission_amount(){ return this.getData('commission_amount');}
    set commission_amount(v){ return this.setData('commission_amount',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get store_manager_id(){ return this.getData('store_manager_id');}
    set store_manager_id(v){ return this.setData('store_manager_id',v);}

    get department_id(){ return this.getData('department_id');}
    set department_id(v){ return this.setData('department_id',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get is_reviewed(){ return this.getData('is_reviewed');}
    set is_reviewed(v){ return this.setData('is_reviewed',v);}


}
