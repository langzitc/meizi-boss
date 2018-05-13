<template>
  <transition>
      <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'Shop',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    activated () {
    }
  }
</script>

<style scoped>

</style>
