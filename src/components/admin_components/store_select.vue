<template>
    <div style="display:inline-block">
        <Select v-show="!home" @on-change="storeChange" :value="store_id" placeholder="请选择门店" clearable transfer>
            <Option v-for="item in storeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>  
        <Dropdown v-show="home" @on-click="handleClick" trigger="click">
            <Button type="text" icon="arrow-down-b" style="color:#fff;font-size:14px">{{name | limit(4)}}</Button>
            <DropdownMenu slot="list" class="text-left">
                <DropdownItem disabled>请选择门店</DropdownItem>
                <DropdownItem :selected="store_id == item.id" v-for="(item,index) in storeList" :key="index" :name="item.id">{{item.name}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>          
    </div>    
</template>

<script>
import Cookies from 'js-cookie'
export default {
    name: 'select-store',
    data (){
        return {
            
        };
    },
    props: {
        home: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        storeList (){
            return this.$store.state.story.storeList;
        },
        store_id () {
            return this.$store.state.story.store_id;
        },
        name () {
            if(this.store_id){
                let d =  this.storeList.filter(e=>{
                    return e.id == this.store_id;
                }); 
                if(d.length){
                    return d[0].name;
                }else{
                    return '请选择门店';
                }               
            }else{
                return '请选择门店';
            }
        }
    },
    watch: {
        store_id (n,o){
            // if(n){
            //     let params = {
            //         store_id: n
            //     };
            //     this.$store.dispatch("GET_DEPARTMENT_LIST",params);                   
            // }else{
            //     this.$store.commit('GET_STAFF_TYPE_LIST',[]);
            //     this.$store.commit('GET_DEPARTMENT_LIST',[]);
            // }
            // this.$store.dispatch("GET_STAFF_TYPE_LIST",{
            //     store_id: 0
            // });              
        }
    },
    methods: {
        storeChange (v) {
            this.$store.commit("SELECT_STORE",v);
            Cookies.set(this.$store.getters.prefix+'store_id',v);
            this.$emit('store-change',v);
        },
        handleClick (id) {
            if(id){
                this.storeChange(id);
            }
        }
    },
    mounted () {
        if(this.store_id){
            this.$emit('store-change',this.store_id);
        }
    }
}
</script>

<style>

</style>
