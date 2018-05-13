export default class List {
    constructor() {
        this.items = [];
    }
    get(fieldName,value = null) {
        let curItem = null;
        this.items.forEach((item)=>{
            if(typeof  item == "object" && item[fieldName] == value) {
                curItem = item;
            } else if(fieldName == item) {
                curItem = item;
            }
        });
        return curItem;
    }

    push(obj) {
        this.items.push(obj);
        return this;
    }

    add(obj) {
        return this.push(obj);
    }
    map(caller) {
        return this.items.map((item)=>{
            return caller(item);
        });
    }
    clear() {
        while(this.items.length > 0) {
            this.items.pop();
        }
        return this;
    }
}