import Utils from "./Utils";

export default class {
    constructor() {
        this._data = {};
    }

    initialize(data) {
        for(let key in data) {
            this._data[key] = data[key];
        }
    }
    setData(key,value,type = null) {
        if(type == null) {
            this._data[key] = value;
            return this;
        }
        this._data[key] = this.castValueType(value, type);
        return this;
    }

    castValueType(value,type) {
        switch(type) {
            case "string":
                return value + "";
            case "float":{
                return Utils.parse(value, "parseFloat");
            }
            case "int":{
                return Utils.parse(value, "parseInt");
            }
            case "object":{
                if(typeof value == "object") {
                    return value;
                }
                if(typeof value == "string") {
                    if(value == "") {
                        return null;
                    }
                    let newValue;
                    eval("newValue = " + value + ";");
                    return newValue;
                }
                throw new Excepton("错误的数据");
            }
            default: {
                return value;
            }
        }
    }

    /**
     *
     * @param key
     * @param type
     * @returns {*}
     */
    getData(key = null, type = null) {
        if(key === null) {
            return this._data;
        }
        let v = this._data[key];
        if(typeof(this._data[key]) == "undefined" && typeof(this[key]) != "undefined") {
            v = this[key];
        }
        return this.castValueType(v, type);
    }
    get data () {
        return this._data;
    }
    set data(v) {
        this._data = v;
    }
    toJSON() {
        return this._data;
    }
    
    FIELDS() {
        return {};
    }
    
    parseJSONObject($object) {
        let fields = this.FIELDS();
        for(let fieldName in $object) {
            if(fields[fieldName]) {
                this.setData(fieldName, $object[fieldName]);
            } else {
                this[fieldName] = $object[fieldName];
            }
        }

        return this;
    }

}