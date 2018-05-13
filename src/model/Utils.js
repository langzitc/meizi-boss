export default {
    timer: null,
    name:"Utils",
    parse: function(value,funcName) {
        if(funcName == "parseInt" || funcName == "parseFloat" || funcName == "parseDouble") {
            if(value === "" || value === null) {
                return null;
            }
        }
        if(typeof(funcName) =="function") {
            return funcName(value);
        } else {
            return eval(funcName + "(value)");
        }
    },
    formatMoney: function (value, length) {
        value = parseFloat(value).toFixed(2);
        return "￥" + value;
    },
    clone: function (obj) {
        var o,i,j,k;
        if(typeof(obj)!="object" || obj===null)return obj;
        if(obj instanceof(Array))
        {
            o=[];
            i=0;j=obj.length;
            for(;i<j;i++)
            {
                if(typeof(obj[i])=="object" && obj[i]!=null)
                {
                    o[i]=this.clone(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        }
        else
        {
            o={};
            for(i in obj)
            {
                if(typeof(obj[i])=="object" && obj[i]!=null)
                {
                    o[i]=this.clone(obj[i]);
                } else {
                    o[i]=obj[i];
                }
            }
        }

        return o;
    },
    
    convertObjectListToSelectOptions: function() {

    },
    getMobileNumberRegex() {
        return /^1[34578]\d{9}$/;
    },
    getServiceTelNumberRegex() {
        return /[0-9\-\+]{8,15}/;
        return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    },
    delay(caller, duration = 800) {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(caller, duration);
    }


}