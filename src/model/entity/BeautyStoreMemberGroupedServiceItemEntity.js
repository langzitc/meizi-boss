
/**
 * BeautyStoreMemberGroupedServiceItemEntity
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
            "service_id": {
                    "type": "number",
                    "name": "service_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "product_id": {
                    "type": "number",
                    "name": "product_id",
                    "null": "NO",
                    "comment": "产品ID",
                    "default": null
            },
            "name": {
                    "type": "string",
                    "name": "name",
                    "null": "NO",
                    "comment": "套餐下单个的产品名",
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
                    "comment": "总价值",
                    "default": "0.00"
            },
            "spent_valuation": {
                    "type": "number",
                    "name": "spent_valuation",
                    "null": "NO",
                    "comment": "已经使用的价值",
                    "default": "0.00"
            },
            "price": {
                    "type": "number",
                    "name": "price",
                    "null": "NO",
                    "comment": "购买价格",
                    "default": "0.00"
            },
            "ordered_qty": {
                    "type": "number",
                    "name": "ordered_qty",
                    "null": "NO",
                    "comment": "次数",
                    "default": "0.00"
            },
            "spent_qty": {
                    "type": "number",
                    "name": "spent_qty",
                    "null": "NO",
                    "comment": "已经花费了的次数",
                    "default": "0.00"
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
            "additional_information": {
                    "type": "string",
                    "name": "additional_information",
                    "null": "YES",
                    "comment": "附加信息，例如通过属性定价时的attributes",
                    "default": null
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get service_id(){ return this.getData('service_id');}
    set service_id(v){ return this.setData('service_id',v);}

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

    get ordered_qty(){ return this.getData('ordered_qty');}
    set ordered_qty(v){ return this.setData('ordered_qty',v);}

    get spent_qty(){ return this.getData('spent_qty');}
    set spent_qty(v){ return this.setData('spent_qty',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}

    get additional_information(){ return this.getData('additional_information');}
    set additional_information(v){ return this.setData('additional_information',v);}


}
