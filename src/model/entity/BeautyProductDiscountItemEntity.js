
/**
 * BeautyProductDiscountItemEntity
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
            "product_discount_id": {
                    "type": "number",
                    "name": "product_discount_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "member_card_id": {
                    "type": "number",
                    "name": "member_card_id",
                    "null": "NO",
                    "comment": "",
                    "default": null
            },
            "discount_type": {
                    "type": "string",
                    "name": "discount_type",
                    "null": "NO",
                    "comment": "0: Fixed, 1:Percent",
                    "default": "0"
            },
            "amount": {
                    "type": "number",
                    "name": "amount",
                    "null": "NO",
                    "comment": "",
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
            }
    }    
    };

    get id(){ return this.getData('id');}
    set id(v){ return this.setData('id',v);}

    get product_discount_id(){ return this.getData('product_discount_id');}
    set product_discount_id(v){ return this.setData('product_discount_id',v);}

    get member_card_id(){ return this.getData('member_card_id');}
    set member_card_id(v){ return this.setData('member_card_id',v);}

    get discount_type(){ return this.getData('discount_type');}
    set discount_type(v){ return this.setData('discount_type',v);}

    get amount(){ return this.getData('amount');}
    set amount(v){ return this.setData('amount',v);}

    get created_at(){ return this.getData('created_at');}
    set created_at(v){ return this.setData('created_at',v);}

    get updated_at(){ return this.getData('updated_at');}
    set updated_at(v){ return this.setData('updated_at',v);}


}
