
/**
 * BeautyStoreEmployeeSalaryEntity
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
            "employee_id": {
                    "type": "number",
                    "name": "employee_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "year": {
                    "type": "number",
                    "name": "year",
                    "null": "NO",
                    "comment": "年份",
                    "default": null
            },
            "month": {
                    "type": "number",
                    "name": "month",
                    "null": "NO",
                    "comment": "月份",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "品牌店ID",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "店铺id",
                    "default": null
            },
            "base_amount": {
                    "type": "number",
                    "name": "base_amount",
                    "null": "NO",
                    "comment": "基本工资",
                    "default": null
            },
            "bonus_amount": {
                    "type": "number",
                    "name": "bonus_amount",
                    "null": "NO",
                    "comment": "奖金",
                    "default": null
            },
            "commission_amount": {
                    "type": "number",
                    "name": "commission_amount",
                    "null": "NO",
                    "comment": "提成",
                    "default": null
            },
            "deduct_amount": {
                    "type": "number",
                    "name": "deduct_amount",
                    "null": "NO",
                    "comment": "扣款,比如迟到等",
                    "default": null
            },
            "withholding_amount": {
                    "type": "number",
                    "name": "withholding_amount",
                    "null": "NO",
                    "comment": "代扣款,比如社保等",
                    "default": null
            },
            "total_amount": {
                    "type": "number",
                    "name": "total_amount",
                    "null": "NO",
                    "comment": "共计",
                    "default": null
            },
            "comment": {
                    "type": "string",
                    "name": "comment",
                    "null": "YES",
                    "comment": "备注",
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

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get year(){ return this.getData('year');}
    set year(v){ return this.setData('year',v);}

    get month(){ return this.getData('month');}
    set month(v){ return this.setData('month',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get base_amount(){ return this.getData('base_amount');}
    set base_amount(v){ return this.setData('base_amount',v);}

    get bonus_amount(){ return this.getData('bonus_amount');}
    set bonus_amount(v){ return this.setData('bonus_amount',v);}

    get commission_amount(){ return this.getData('commission_amount');}
    set commission_amount(v){ return this.setData('commission_amount',v);}

    get deduct_amount(){ return this.getData('deduct_amount');}
    set deduct_amount(v){ return this.setData('deduct_amount',v);}

    get withholding_amount(){ return this.getData('withholding_amount');}
    set withholding_amount(v){ return this.setData('withholding_amount',v);}

    get total_amount(){ return this.getData('total_amount');}
    set total_amount(v){ return this.setData('total_amount',v);}

    get comment(){ return this.getData('comment');}
    set comment(v){ return this.setData('comment',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
