
/**
 * BeautyStoreEmployeeReviewItemEntity
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
            "review_item_id": {
                    "type": "number",
                    "name": "review_item_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "rate": {
                    "type": "number",
                    "name": "rate",
                    "null": "NO",
                    "comment": "评价",
                    "default": "0.00"
            },
            "create_at": {
                    "type": "string",
                    "name": "create_at",
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

    get review_item_id(){ return this.getData('review_item_id');}
    set review_item_id(v){ return this.setData('review_item_id',v);}

    get rate(){ return this.getData('rate');}
    set rate(v){ return this.setData('rate',v);}

    get create_at(){ return this.getData('create_at');}
    set create_at(v){ return this.setData('create_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
