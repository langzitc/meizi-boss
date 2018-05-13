import VueStore from "../store"

export default {
    name: "Cache",
    store: VueStore,
    keyPrefix: "",
    status: true,
    get: function(key) {
        if(this.status == false) {
            return null;
        }
    },
    set:function (key, value) {
        this.store.commit()
    },
    unset:function(key) {

    },
    clear: function() {

    }
}