
/**
 * BeautyStoreEmployeeJobTitleEntity
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
            "name": {
                    "type": "string",
                    "name": "name",
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
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "is_deleted": {
                    "type": "string",
                    "name": "is_deleted",
                    "null": "NO",
                    "comment": "",
                    "default": "0"
            },
            "system_item_id": {
                    "type": "number",
                    "name": "system_item_id",
                    "null": "YES",
                    "comment": "对应的系统分类的ID, brand_store_id为0的为系统分类, 设置店铺职位的时候从系统分类初始化店铺分类并设置系统分类id到system_item_id ",
                    "default": "0"
            },
            "created_at": {
                    "type": "string",
                    "name": "created_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "updated_at": {
                    "type": "string",
                    "name": "updated_at",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "industry_id": {
                    "type": "number",
                    "name": "industry_id",
                    "null": "NO",
                    "comment": "",
                    "default": "1"
            },
            "is_price_able": {
                    "type": "number",
                    "name": "is_price_able",
                    "null": "NO",
                    "comment": "只有造型师可以用来设置价格",
                    "default": "0"
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get parent_id(){ return this.getData('parent_id');}
    set parent_id(v){ return this.setData('parent_id',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get is_deleted(){ return this.getData('is_deleted');}
    set is_deleted(v){ return this.setData('is_deleted',v);}

    get system_item_id(){ return this.getData('system_item_id');}
    set system_item_id(v){ return this.setData('system_item_id',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get industry_id(){ return this.getData('industry_id');}
    set industry_id(v){ return this.setData('industry_id',v);}

    get is_price_able(){ return this.getData('is_price_able');}
    set is_price_able(v){ return this.setData('is_price_able',v);}


}
