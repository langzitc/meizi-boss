
/**
 * BeautyStoreMemberGroupedServiceEntity
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
            "store_member_id": {
                    "type": "number",
                    "name": "store_member_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "order_id": {
                    "type": "number",
                    "name": "order_id",
                    "null": "NO",
                    "comment": "套餐订购ORDER ID",
                    "default": null
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "套餐产品名",
                    "default": null
            },
            "sku": {
                    "type": "string",
                    "name": "sku",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "valuation": {
                    "type": "number",
                    "name": "valuation",
                    "null": "NO",
                    "comment": "价值",
                    "default": "0.00"
            },
            "spent_valuation": {
                    "type": "number",
                    "name": "spent_valuation",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "price": {
                    "type": "number",
                    "name": "price",
                    "null": "NO",
                    "comment": "购买价格",
                    "default": "0.00"
            },
            "brand_store_id": {
                    "type": "number",
                    "name": "brand_store_id",
                    "null": "NO",
                    "comment": "品牌店ID",
                    "default": null
            },
            "store_id": {
                    "type": "number",
                    "name": "store_id",
                    "null": "NO",
                    "comment": "店铺ID",
                    "default": null
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
            "spent_amount": {
                    "type": "number",
                    "name": "spent_amount",
                    "null": "NO",
                    "comment": "已经花费的",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get store_member_id(){ return this.getData('store_member_id');}
    set store_member_id(v){ return this.setData('store_member_id',v);}

    get order_id(){ return this.getData('order_id');}
    set order_id(v){ return this.setData('order_id',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get name(){ return this.getData('name');}
    set name(v){ return this.setData('name',v);}

    get sku(){ return this.getData('sku');}
    set sku(v){ return this.setData('sku',v);}

    get valuation(){ return this.getData('valuation');}
    set valuation(v){ return this.setData('valuation',v);}

    get spent_valuation(){ return this.getData('spent_valuation');}
    set spent_valuation(v){ return this.setData('spent_valuation',v);}

    get price(){ return this.getData('price');}
    set price(v){ return this.setData('price',v);}

    get brand_store_id(){ return this.getData('brand_store_id');}
    set brand_store_id(v){ return this.setData('brand_store_id',v);}

    get store_id(){ return this.getData('store_id');}
    set store_id(v){ return this.setData('store_id',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get spent_amount(){ return this.getData('spent_amount');}
    set spent_amount(v){ return this.setData('spent_amount',v);}


}
