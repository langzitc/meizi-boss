import axios from 'axios'
import qs from 'qs'
import iview from 'iview'
import store from '../store'
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
axios.defaults.baseURL = `${API_PATH}`;
axios.defaults.transformRequest = (data)=>{
  if(data){
    let d = {data: data};
    // return qs.stringify(d);
    return  JSON.stringify(d);
  }
  return;
}
axios.defaults.transformResponse = (data)=>{
  return data;
}
//请求拦截器
axios.interceptors.request.use(function(config){
  if(config.method === 'get'){
    store.commit('ADD_REQUEST');
  }
  return config;
},function(error){
  return Promise.reject(error);
});
//返回拦截器
let flag = true;
axios.interceptors.response.use(function(response){
    if(response.config.method === 'get'){
      store.commit('REDUCE_REQUEST');
    }
    let data = JSON.parse(response.data);
    if(response.request.responseURL.includes('/public/login')){
      return data;
    }
    if(data.code == 401){
      if(flag){
        store.commit("USER_LOGOUT");
        iview.Message.warning("会话已过期，请重新登录！");
        flag = false;
        setTimeout(()=>{
          flag = true;
        },5000);        
      }
    }else if(data.code!==200){
       iview.Message.error(data.message);
    }else{
      return data;
    }
},function(error){
    //对返回的错误进行一些处理
    iview.Message.error("服务器错误！");
    return Promise.reject(error);
});
