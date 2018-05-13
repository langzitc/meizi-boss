
/**
 * BeautyRegionEntity
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
            "parent_id": {
                    "type": "number",
                    "name": "parent_id",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "path": {
                    "type": "string",
                    "name": "path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get path(){ return this.getData('path');}
    set path(v){ return this.setData('path',v);}


}
