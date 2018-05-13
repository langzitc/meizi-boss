
/**
 * BeautyStoreEmployeeWorksImageEntity
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
            "works_id": {
                    "type": "number",
                    "name": "works_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "image_path": {
                    "type": "string",
                    "name": "image_path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get works_id(){ return this.getData('works_id');}
    set works_id(v){ return this.setData('works_id',v);}

    get image_path(){ return this.getData('image_path');}
    set image_path(v){ return this.setData('image_path',v);}


}
