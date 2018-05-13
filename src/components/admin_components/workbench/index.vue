<template>
  <transition>
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'Workbench',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped>

</style>
