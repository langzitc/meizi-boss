import axios from 'axios'
export default {
  state: {
    province: []
  },
  mutations: {
    GET_PROVINCE (state,data){
      state.province = data;
    }
  },
  actions: {
    GET_PROVINCE ({commit},pid = 0){
      let province = localStorage.getItem("mzmy_province");
      let p = province ? JSON.parse(province) : false;
      if(p){
        commit("GET_PROVINCE",p);
      }else{
        axios.get("/region/list",{pid}).then((res)=>{
          if(res.code == 200){
            commit("GET_PROVINCE",res.data);
            localStorage.setItem("mzmy_province",JSON.stringify(res.data));
          }
        })
      }
    }
  },
  getters: {}
}
