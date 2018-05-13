
/**
 * BeautyStoreEmployeeServiceEntity
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
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "品牌店ID",
                    "default": "0"
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "门店ID",
                    "default": "0"
            },
            "employee_id": {
                    "type": "number",
                    "name": "employee_id",
                    "null": "NO",
                    "comment": "员工ID",
                    "default": "0"
            },
            "service_id": {
                    "type": "number",
                    "name": "service_id",
                    "null": "NO",
                    "comment": "项目ID, 为0时为所有项目",
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
            },
            "is_service_all": {
                    "type": "number",
                    "name": "is_service_all",
                    "null": "NO",
                    "comment": "是否服务于所有服务",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get service_id(){ return this.getData('service_id');}
    set service_id(v){ return this.setData('service_id',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get is_service_all(){ return this.getData('is_service_all');}
    set is_service_all(v){ return this.setData('is_service_all',v);}


}
