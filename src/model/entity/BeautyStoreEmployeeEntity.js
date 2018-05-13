
/**
 * BeautyStoreEmployeeEntity
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
            "member_id": {
                    "type": "number",
                    "name": "member_id",
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
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "YES",
                    "comment": " 品牌店铺ID",
                    "default": "0"
            },
            "name": {
                    "type": "string",
                    "name": "name",
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
            "description": {
                    "type": "string",
                    "name": "description",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "job_title_id": {
                    "type": "number",
                    "name": "job_title_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "department_id": {
                    "type": "number",
                    "name": "department_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "gender": {
                    "type": "number",
                    "name": "gender",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "id_number": {
                    "type": "string",
                    "name": "id_number",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "employee_number": {
                    "type": "string",
                    "name": "employee_number",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "bank_number": {
                    "type": "string",
                    "name": "bank_number",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "hiredate": {
                    "type": "string",
                    "name": "hiredate",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "password": {
                    "type": "string",
                    "name": "password",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "allow_appointment": {
                    "type": "string",
                    "name": "allow_appointment",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "available_all_service": {
                    "type": "string",
                    "name": "available_all_service",
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
            "work_seniority": {
                    "type": "number",
                    "name": "work_seniority",
                    "null": "NO",
                    "comment": "工作年限",
                    "default": "0"
            },
            "order_number": {
                    "type": "number",
                    "name": "order_number",
                    "null": "NO",
                    "comment": "接单量",
                    "default": "0"
            },
            "review_number": {
                    "type": "number",
                    "name": "review_number",
                    "null": "NO",
                    "comment": "评论数量",
                    "default": "0"
            },
            "overall_rating": {
                    "type": "number",
                    "name": "overall_rating",
                    "null": "NO",
                    "comment": "综合评分",
                    "default": "0.0000"
            },
            "max_price": {
                    "type": "number",
                    "name": "max_price",
                    "null": "NO",
                    "comment": "最高价格",
                    "default": "0.0000"
            },
            "min_price": {
                    "type": "number",
                    "name": "min_price",
                    "null": "NO",
                    "comment": "最低价格",
                    "default": "0.0000"
            },
            "status": {
                    "type": "number",
                    "name": "status",
                    "null": "NO",
                    "comment": "员工状态: 0:离职, 1:在职",
                    "default": "1"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get member_id(){ return this.getData('member_id');}
    set member_id(v){ return this.setData('member_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get mobile(){ return this.getData('mobile');}
    set mobile(v){ return this.setData('mobile',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get job_title_id(){ return this.getData('job_title_id');}
    set job_title_id(v){ return this.setData('job_title_id',v);}

    get department_id(){ return this.getData('department_id');}
    set department_id(v){ return this.setData('department_id',v);}

    get gender(){ return this.getData('gender');}
    set gender(v){ return this.setData('gender',v);}

    get id_number(){ return this.getData('id_number');}
    set id_number(v){ return this.setData('id_number',v);}

    get employee_number(){ return this.getData('employee_number');}
    set employee_number(v){ return this.setData('employee_number',v);}

    get bank_number(){ return this.getData('bank_number');}
    set bank_number(v){ return this.setData('bank_number',v);}

    get hiredate(){ return this.getData('hiredate');}
    set hiredate(v){ return this.setData('hiredate',v);}

    get password(){ return this.getData('password');}
    set password(v){ return this.setData('password',v);}

    get allow_appointment(){ return this.getData('allow_appointment');}
    set allow_appointment(v){ return this.setData('allow_appointment',v);}

    get available_all_service(){ return this.getData('available_all_service');}
    set available_all_service(v){ return this.setData('available_all_service',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get work_seniority(){ return this.getData('work_seniority');}
    set work_seniority(v){ return this.setData('work_seniority',v);}

    get order_number(){ return this.getData('order_number');}
    set order_number(v){ return this.setData('order_number',v);}

    get review_number(){ return this.getData('review_number');}
    set review_number(v){ return this.setData('review_number',v);}

    get overall_rating(){ return this.getData('overall_rating');}
    set overall_rating(v){ return this.setData('overall_rating',v);}

    get max_price(){ return this.getData('max_price');}
    set max_price(v){ return this.setData('max_price',v);}

    get min_price(){ return this.getData('min_price');}
    set min_price(v){ return this.setData('min_price',v);}

    get status(){ return this.getData('status');}
    set status(v){ return this.setData('status',v);}


}
