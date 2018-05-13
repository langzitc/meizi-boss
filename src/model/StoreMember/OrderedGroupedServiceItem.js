import AbstractModel from "../AbstractModel";

class OrderedGroupedServiceItem extends AbstractModel {
    get fullName() {
        return this._data.name + "FFFFF";
    }
    get attributeLabels() {
        return this.getAttributeTexts();
    }
    get id () {
        return this._data.id;
    }
    getUnitOriginPrice() {
        return (this._data.valuation / this._data.ordered_qty).toFixed(2);
    }

    getUnitPrice() {
        return (this._data.price / this._data.ordered_qty).toFixed(2);
    }

    getAttributeTexts() {
        let attributes = this._data.formatted_attributes;
        if(!attributes) {
            return "";
        }
        let str ="";
        for(let attributeCode in attributes) {
            str += attributes[attributeCode].value_label;
        }
        return str.length > 0 ? " / " + str : "";
    }

    convertToCartItem(cartItem) {
        console.log(cartItem);
        cartItem.product_name = this._data.name;
        cartItem.sku = this._data.sku;
        cartItem.product_id = this._data.product_id;
        cartItem.ordered_grouped_service_item_id = this._data.id;
        cartItem.origin_price = ( this._data.valuation / this._data.ordered_qty).toFixed(2);
        cartItem.price = ( this._data.price / this._data.ordered_qty).toFixed(2);
    }
}
export default {
    name: "OrderedGroupedServiceItem",
    newInstance: function(item = null) {
        let ins =  new OrderedGroupedServiceItem();
        if(item !== null) {
            ins.initialize(item);
        }
        return ins;
    }
}