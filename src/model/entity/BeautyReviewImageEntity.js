
/**
 * BeautyReviewImageEntity
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
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "image_path": {
                    "type": "string",
                    "name": "image_path",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get review_id(){ return this.getData('review_id');}
    set review_id(v){ return this.setData('review_id',v);}

    get image_path(){ return this.getData('image_path');}
    set image_path(v){ return this.setData('image_path',v);}


}
