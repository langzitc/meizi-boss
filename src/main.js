import iview from 'iview'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import  './config'
import './theme/index.less'
import axios from 'axios'
import Cookies from 'js-cookie'
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
/* eslint-disable no-new */
iview.LoadingBar.config({
  color: '#2db7f5',
  height: 3
});
Vue.use(iview);
router.beforeEach((to,from,next)=>{
  iview.LoadingBar.start();
  if (Cookies.get('locking') === '1' && to.name !== 'locking') {  // 判断当前是否是锁定状态
    next(false);
    router.replace({
      name: 'locking'
    });
  } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
    next(false);
  } else {
    if(to.path.includes("/login")||to.path.includes("/register")){
      if(store.state.user.sid){
        next(from.path);
        return false;
      }
    }else if(to.path.includes("/admin")&& !Cookies.getJSON("mzmy_session")){
      next("/login");
      return false;
    }
    next();
  }
  iview.LoadingBar.finish();
})
router.afterEach((to) => {
  iview.LoadingBar.finish();
  window.scrollTo(0, 0);
});

Vue.filter('money', function (value) {
    return "￥" + parseFloat(value).toFixed(2);
});

Vue.filter('percent', function (value) {
    return parseFloat(value).toFixed(0) + "%";
});
Vue.filter('percent_divide', function (value) {
    return (parseFloat(value) / 100).toFixed(0) + "%";
});
Vue.filter('percent_multiply', function (value) {
    return (parseFloat(value) * 100).toFixed(0) + "%";
});
Vue.filter('limit', function (value,len) {
  if(value&&String(value).length>len){
    return String(value).substr(value,len)+"...";
  }
  return value;
});
Vue.filter('times', function (value) {
  let str = '1970/01/01'+" "+value;
  return (new Date(str)).Format('hh:mm');
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
