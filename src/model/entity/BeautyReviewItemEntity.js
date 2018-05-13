
/**
 * BeautyReviewItemEntity
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
            "title": {
                    "type": "string",
                    "name": "title",
                    "null": "NO",
                    "comment": "标题",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "为0时为通用适应所有品牌店,　是否需要每个店可以自定义待定,预留接口",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get title(){ return this.getData('title');}
    set title(v){ return this.setData('title',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}


}
