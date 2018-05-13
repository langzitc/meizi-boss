const lodash = require("lodash");
const md5 = require("blueimp-md5")
export default {
    name: "HttpRequest",
    cache: {

    },
    processor: {

    },
    get:function(url,params,caller) {
        let key = JSON.stringify(params) + url;
        key = md5(key);
        let timestamp = (new Date()).valueOf();
        if(this.cache.key) {
            let cacheData = this.cache.key;
            if( (cacheData.timestamp + 1 ) >= timestamp) {
                return cacheData.data;
            }
        }
        this.$http.get(url,params).then((res)=>{

            this.cache.key = {
                timestamp: timestamp,
                data: res
            }
            if(caller) {
                caller(res);
            }
        });
    }

}