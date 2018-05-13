
/**
 * BeautyStoreEmployeeWorksEntity
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
            "hits": {
                    "type": "number",
                    "name": "hits",
                    "null": "YES",
                    "comment": "点击量",
                    "default": "0"
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "YES",
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
            "category_id": {
                    "type": "number",
                    "name": "category_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "gender": {
                    "type": "number",
                    "name": "gender",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "sort": {
                    "type": "number",
                    "name": "sort",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "face_model": {
                    "type": "number",
                    "name": "face_model",
                    "null": "NO",
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

    get hits(){ return this.getData('hits');}
    set hits(v){ return this.setData('hits',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get employee_id(){ return this.getData('employee_id');}
    set employee_id(v){ return this.setData('employee_id',v);}

    get category_id(){ return this.getData('category_id');}
    set category_id(v){ return this.setData('category_id',v);}

    get gender(){ return this.getData('gender');}
    set gender(v){ return this.setData('gender',v);}

    get sort(){ return this.getData('sort');}
    set sort(v){ return this.setData('sort',v);}

    get face_model(){ return this.getData('face_model');}
    set face_model(v){ return this.setData('face_model',v);}

    get description(){ return this.getData('description');}
    set description(v){ return this.setData('description',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
