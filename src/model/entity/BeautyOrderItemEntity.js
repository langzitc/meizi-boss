
/**
 * BeautyOrderItemEntity
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
            "order_id": {
                    "type": "number",
                    "name": "order_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "ordered_grouped_service_item_id": {
                    "type": "number",
                    "name": "ordered_grouped_service_item_id",
                    "null": "YES",
                    "comment": "已经订购了的套餐的服务项的id",
                    "default": "0"
            },
            "product_name": {
                    "type": "string",
                    "name": "product_name",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "sku": {
                    "type": "string",
                    "name": "sku",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "origin_price": {
                    "type": "number",
                    "name": "origin_price",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "price": {
                    "type": "number",
                    "name": "price",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "discount_amount": {
                    "type": "number",
                    "name": "discount_amount",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "ordered_qty": {
                    "type": "number",
                    "name": "ordered_qty",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "total_discount": {
                    "type": "number",
                    "name": "total_discount",
                    "null": "NO",
                    "comment": "qty * discount_amount",
                    "default": null
            },
            "row_total": {
                    "type": "number",
                    "name": "row_total",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "",
                    "default": null
            },
            "coupon_ids": {
                    "type": "string",
                    "name": "coupon_ids",
                    "null": "YES",
                    "comment": "",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get order_id(){ return this.getData('order_id');}
    set order_id(v){ return this.setData('order_id',v);}

    get product_id(){ return this.getData('product_id');}
    set product_id(v){ return this.setData('product_id',v);}

    get ordered_grouped_service_item_id(){ return this.getData('ordered_grouped_service_item_id');}
    set ordered_grouped_service_item_id(v){ return this.setData('ordered_grouped_service_item_id',v);}

    get product_name(){ return this.getData('product_name');}
    set product_name(v){ return this.setData('product_name',v);}

    get sku(){ return this.getData('sku');}
    set sku(v){ return this.setData('sku',v);}

    get origin_price(){ return this.getData('origin_price');}
    set origin_price(v){ return this.setData('origin_price',v);}

    get price(){ return this.getData('price');}
    set price(v){ return this.setData('price',v);}

    get discount_amount(){ return this.getData('discount_amount');}
    set discount_amount(v){ return this.setData('discount_amount',v);}

    get ordered_qty(){ return this.getData('ordered_qty');}
    set ordered_qty(v){ return this.setData('ordered_qty',v);}

    get total_discount(){ return this.getData('total_discount');}
    set total_discount(v){ return this.setData('total_discount',v);}

    get row_total(){ return this.getData('row_total');}
    set row_total(v){ return this.setData('row_total',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}

    get coupon_ids(){ return this.getData('coupon_ids');}
    set coupon_ids(v){ return this.setData('coupon_ids',v);}


}
