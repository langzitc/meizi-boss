<template>
  <transition>
      <router-view></router-view>
  </transition>  
</template>

<script>
  export default {
    name: 'StoreManager',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted (){
      
    }
  }
</script>

<style scoped>

</style>
