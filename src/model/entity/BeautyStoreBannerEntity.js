
/**
 * BeautyStoreBannerEntity
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
                    "comment": "",
                    "default": "BANNER"
            },
            "title": {
                    "type": "string",
                    "name": "title",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "path": {
                    "type": "string",
                    "name": "path",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "url": {
                    "type": "string",
                    "name": "url",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "YES",
                    "comment": "",
                    "default": "0"
            },
            "end_at": {
                    "type": "string",
                    "name": "end_at",
                    "null": "YES",
                    "comment": "自动下线时间",
                    "default": null
            },
            "start_at": {
                    "type": "string",
                    "name": "start_at",
                    "null": "YES",
                    "comment": "自动激活时间",
                    "default": null
            },
            "is_active": {
                    "type": "string",
                    "name": "is_active",
                    "null": "YES",
                    "comment": "是否激活",
                    "default": "1"
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
            "sort_order": {
                    "type": "number",
                    "name": "sort_order",
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

    get title(){ return this.getData('title');}
    set title(v){ return this.setData('title',v);}

    get path(){ return this.getData('path');}
    set path(v){ return this.setData('path',v);}

    get url(){ return this.getData('url');}
    set url(v){ return this.setData('url',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get end_at(){ return this.getData('end_at');}
    set end_at(v){ return this.setData('end_at',v);}

    get start_at(){ return this.getData('start_at');}
    set start_at(v){ return this.setData('start_at',v);}

    get is_active(){ return this.getData('is_active');}
    set is_active(v){ return this.setData('is_active',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get sort_order(){ return this.getData('sort_order');}
    set sort_order(v){ return this.setData('sort_order',v);}


}
