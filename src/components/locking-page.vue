<template>
    <div class="un-lock-box">
        <div class="unlock-con">
            <unlock :show-unlock="showUnlock" @on-unlock="handleUnlock"></unlock>
        </div>
    </div>
</template>
<style type="less" scoped>
  .un-lock-box{
    width: 100%;
    height: 100%;
    background-image: url("../../static/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
<script>
import unlock from './unlock.vue';
import Cookies from 'js-cookie'
export default {
    components: {
        unlock
    },
    data () {
        return {
            showUnlock: false
        };
    },
    methods: {
        handleUnlock () {
            let lockScreenBack = document.getElementById('lock_screen_back');
            this.showUnlock = false;
            lockScreenBack.style.zIndex = -1;
            lockScreenBack.style.boxShadow = '0 0 0 0 #667aa6 inset';
            this.$router.push({
                path: Cookies.get(this.$store.getters.prefix+'last_page_path')  // 解锁之后跳转到锁屏之前的页面
            });
        }
    },
    mounted () {
        this.showUnlock = true;
        let lockScreenBack = document.getElementById('lock_screen_back');
        lockScreenBack.style.zIndex = -1;
    }
};
</script>
