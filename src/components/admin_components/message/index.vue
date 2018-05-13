<template>
  <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
  export default {
    name: 'Message',
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
