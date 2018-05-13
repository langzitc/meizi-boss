
/**
 * BeautyStoreEmployeeWorksTagEntity
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
            "tag_id": {
                    "type": "number",
                    "name": "tag_id",
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

    get tag_id(){ return this.getData('tag_id');}
    set tag_id(v){ return this.setData('tag_id',v);}


}
