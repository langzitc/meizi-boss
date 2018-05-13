
/**
 * BeautyStoreOptionEntity
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
            "code": {
                    "type": "string",
                    "name": "code",
                    "null": "NO",
                    "comment": "选项类型，比如 分类:CATEGORY，标签:TAG，脸型:FACE_MODEL等",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "parent_id": {
                    "type": "number",
                    "name": "parent_id",
                    "null": "YES",
                    "comment": "上级ID",
                    "default": "0"
            },
            "label": {
                    "type": "string",
                    "name": "label",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get code(){ return this.getData('code');}
    set code(v){ return this.setData('code',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get label(){ return this.getData('label');}
    set label(v){ return this.setData('label',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}


}
