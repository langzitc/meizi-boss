import AbstractModel from "./../AbstractModel"
import OrderedGroupedServiceItem from "./OrderedGroupedServiceItem";
class OrderedGroupedService extends AbstractModel {
    initialize(data) {
        //super.initialize(data)
        for(let key in data) {
            if(key == "items") {
                let items = [];
                let oldItems = data[key];
                oldItems.map((source)=>{
                    let target = OrderedGroupedServiceItem.newInstance(source);
                    items.push(target)
                })
                this._data[key] = items;
            } else {
                this._data[key] = data[key];
            }
        }
    }
    get items() {
        return this._data.items;
    }
}

export default {
    name: "OrderedGroupedService",
    newInstance:function() {
        return new OrderedGroupedService();
    },
}