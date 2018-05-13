
/**
 * BeautyReviewItemDetailEntity
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
            "review_id": {
                    "type": "number",
                    "name": "review_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "review_item_id": {
                    "type": "number",
                    "name": "review_item_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "rate": {
                    "type": "number",
                    "name": "rate",
                    "null": "NO",
                    "comment": "",
                    "default": "0.00"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get review_id(){ return this.getData('review_id');}
    set review_id(v){ return this.setData('review_id',v);}

    get review_item_id(){ return this.getData('review_item_id');}
    set review_item_id(v){ return this.setData('review_item_id',v);}

    get rate(){ return this.getData('rate');}
    set rate(v){ return this.setData('rate',v);}


}
