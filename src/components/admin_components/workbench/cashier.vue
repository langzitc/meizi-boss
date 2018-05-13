<template>
    <div>
        <div v-if="isComponent">
            <cashier-jiezhang></cashier-jiezhang>
        </div>
        <div v-if="!isComponent">
            <cashier-list ref="clist"></cashier-list>
        </div>
    </div>
</template>

<script>
import CashierList from './cashier_list'
import CashierJiezhang from './cashier_jiezhang'
export default {
    name: 'Cashier',
    data () {
        return {

        }
    },
    computed: {
        isComponent (){
            if(this.$route.query.type&&this.$route.query.type == 'jiezhang'){
                return true;
            }else{
                return false;
            }
        }
    },
    components: {
        CashierList,
        CashierJiezhang
    } 
}
</script>

<style>

</style>
