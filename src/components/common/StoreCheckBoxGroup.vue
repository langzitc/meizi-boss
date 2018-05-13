<template>

    <div>
        <div v-for="group in storeGroups">
            <div>
            <GroupCheckBox @changed="checkedStoreChanged"
                           :group="group"
                           :options="group.stores" :values="formattedValues"></GroupCheckBox>
            </div>
        </div>
    </div>

</template>
<script>
    import GroupCheckBox from './GroupCheckBox';
    import Utils from "../../model/Utils";

    export default  {
        name:"StoreCheckBoxGroup",
        data() {
            return {
                stores:[],
                options:[],
                storeGroups:[],
                newCheckedStores:[],
                isInit: true
            }
        },
        components:{
            GroupCheckBox
        },
        mounted: function() {
            this.loadStores();

        },
        watch: {

        },
        props: ["values"],
        computed:{
            formattedValues: function() {
                let v = [];
                if(this.values == undefined) {
                    return v;
                }
                this.values.map((tv)=>{
                    if(tv instanceof Object) {
                        v.push(tv.id + "")
                    }else {
                        v.push(tv)
                    }
                });
                return v;
            }
        },
        methods: {
            getCheckedStoresByValues(values) {
                console.log(values);
                let stores = [];
                values.map((data)=>{
                    this.stores.map((store)=>{
                        if( Utils.parse(store.id,"parseInt") == Utils.parse(data,"parseInt")) {
                            stores.push(store);
                        }
                    });
                });
                console.log(stores);
                return stores;
            },
            checkedStoreChanged:function(data) {
                let stores = this.getCheckedStoresByValues(data);
                this.$emit('changed', stores);
            },
            loadStores() {
                let params = {
                    is_grouped: 1
                };
                this.$http.get("/boss/store/list",{params}).then((res)=>{
                    res.data.map((group)=>{
                        let tempGroup = {
                            id:group.id,
                            name:group.name,
                            stores:[]
                        };
                        group.stores.map((store)=>{
                            tempGroup.stores.push({
                                label: store.name,
                                value:store.id
                            });
                            this.stores.push(store);
                        });
                        this.storeGroups.push(tempGroup)
                    });
                    console.log(this.storeGroups)
                });
            }
        }
    }
</script>