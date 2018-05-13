import axios from 'axios'
import types from './types'
import router from '../router'
import Cookies from 'js-cookie'
export default {
  state: {
    storeGroupList: [],
    storeList: [],
    departList: [],
    staffTypeList: [],
    cardList: [],
    store_id: "",
    storeBrand: {
      id: '',
      name: '',
      description: '',
      contacts_name: '',
      contacts_mobile: '',
      service_tel: '',
      logo_path: ''
    },
    serviceTypeList: [],
    guigeList: [],
    storeByGroupList: [],
    groupedServiceTypeList: []
  },
  mutations: {
    GET_STORE_GROUP (state, newState) {
      state.storeGroupList = newState;
    },
    GET_STORE_LIST (state, newState) {
      state.storeList = newState;
    },
    GET_STORE_BRAND (state, newState){
      Object.assign(state.storeBrand,newState);
    },
    GET_DEPARTMENT_LIST (state, newState){
      state.departList = newState;
    },
    GET_STAFF_TYPE_LIST (state, newState){
      state.staffTypeList = newState;
    },
    SELECT_STORE (state, id) {
      state.store_id = id;
    },
    GET_CARD_LIST (state,data){
      state.cardList = data;
    },
    SET_SERVICE_TYPE (state,data){
      state.serviceTypeList = data;
    },
    SET_GROUPED_SERVICE_TYPE (state,data) {
      state.groupedServiceTypeList = data;
    },
    SET_GUI_GE (state,data) {
      state.guigeList = data;
    },
    SET_STORE_BY_GROUP (state, data){
      state.storeByGroupList = data;
    } 
  },
  actions: {
    GET_STORE_GROUP ({commit,rootGetters},force = false) {
      if(!force){
        let gl = localStorage.getItem(rootGetters.prefix+"mzmy_store_group");
        if(gl){
          commit("GET_STORE_GROUP",JSON.parse(gl));
          return;
        }
      }
      axios.get("/boss/storeGroup/list").then((res)=>{
        if(res.code == 200){
          let d = res.data;
          commit("GET_STORE_GROUP",d);
          localStorage.setItem(rootGetters.prefix+"mzmy_store_group",JSON.stringify(d));
        }
      }).catch((e)=>{
        throw(new Error(e));
      })
    },
    GET_STORE_LIST ({commit,rootGetters},params) {
        return new Promise((resolve,reject)=>{
          axios.get("/boss/store/list",{params}).then((res)=>{
            if(res.code == 200){
              let d = res.data;
              commit("GET_STORE_LIST",d);
              let store_id = Cookies.get(rootGetters.prefix+"store_id");
              if(d.length){
                let flag = d.filter(e=>{
                  return e.id == store_id;
                });
                if(flag.length){
                  commit("SELECT_STORE",store_id);
                }else{
                  commit("SELECT_STORE",d[0].id);
                } 
              }            
              resolve();
            }
          }).catch((e)=>{
            reject(e);
          })
        })
    },
    SET_DEFAULT_STORE () {
      return new Promise((resolve,reject)=>{
        axios.post("/store/defaultStore").then(()=>{
          resolve();
        }).catch((e)=>{
          throw new Error(e);
        })
      })
    },
    ADD_STORE_GROUP ({commit,dispatch},data) {
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeGroup/batchCreate",data).then((res)=>{
            dispatch("GET_STORE_GROUP",true);
            resolve(res.message);
        }).catch((e)=>{
          reject(e);
        });
      });
    },
    DELETE_STORE_GROUP ({dispatch},id) {
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeGroup/delete",id).then((res)=>{
          if(res.code == 200){
            dispatch("GET_STORE_GROUP",true);
            resolve(res.message);
          }else{
            reject(res.message);
          }
        }).catch((e)=>{
          reject(e);
        })
      });
    },
    SAVE_STORE_GROUP ({dispatch},data){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeGroup/update",data).then((res)=>{
          if(res.code == 200){
            dispatch("GET_STORE_GROUP",true);
            resolve(res.message);
          }else{
            reject(res.message);
          }
        }).catch((e)=>{
          reject(e);
        })
      });
    },
    ADD_SUB_STORE ({dispatch},data) {
      return new Promise((resolve,reject)=>{
        axios.post("/boss/store/create",data).then((res)=>{
          resolve(res.message);
          dispatch("GET_STORE_LIST");
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    UPDATE_SUB_STORE ({dispatch},data) {
      return new Promise((resolve,reject)=>{
        axios.post("/boss/store/update",data).then((res)=>{
          resolve(res.message);
          dispatch("GET_STORE_LIST");
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    GET_SUB_STORE_INFO ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.get("/boss/store/info",{params}).then((res)=>{
          if(res.code == 200){
            resolve(res.data);
          }
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    DELETE_SUB_STORE ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/store/delete",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    GET_STORE_BRAND ({commit}){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/store/infoBrandStore").then((res)=>{
          commit("GET_STORE_BRAND",res.data);
          resolve();
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    UPDATE_STORE_BRAND ({dispatch},data){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/store/updateBrand",data).then((res)=>{
          this.commit("GET_STORE_BRAND",res.data);
          dispatch("GET_STORE_BRAND");
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    GET_DEPARTMENT_LIST ({commit},params){
      return new Promise((resolve,reject)=>{
        axios.get("/boss/storeDepartment/list",{params}).then((res)=>{
          commit("GET_DEPARTMENT_LIST",res.data);
          resolve(res.data);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    ADD_STORE_DEPARTMENT ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeDepartment/create",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    DELETE_STORE_DEPARTMENT ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeDepartment/delete",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    UPDATE_STORE_DEPARTMENT ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeDepartment/update",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    ADD_STAFF_TYPE ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeEmployeeJobTitle/BatchCreate",params).then((res)=>{
          resolve(res.message);
      }).catch ((e)=>{
        reject(e);
      })
      });
    },
    GET_STAFF_TYPE_LIST2 ({commit},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeEmployeeJobTitle/list",params).then((res)=>{
          resolve(res.data);
        }).catch((e)=>{
          reject(e);
        })
      });
    },    
    GET_STAFF_TYPE_LIST ({commit},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeEmployeeJobTitle/list",params).then((res)=>{
          commit("GET_STAFF_TYPE_LIST",res.data);
          resolve();
        }).catch((e)=>{
          reject(e);
        })
      });
    },
    STAFF_TYPE_DELETE ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeEmployeeJobTitle/delete",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      });
    },
    STAFF_TYPE_UPDATE ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/storeEmployeeJobTitle/update",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      });
    },
    EMPLOYEE_ADD ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/employee/create",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    EMPLOYEE_DELETE ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/employee/delete",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    EMPLOYEE_UPDATE ({dispatch},params){
      return new Promise((resolve,reject)=>{
        axios.post("/boss/employee/update",params).then((res)=>{
          resolve(res.message);
        }).catch((e)=>{
          reject(e);
        })
      })
    },
    GET_CARD_LIST ({commit},params) {
      axios.get("/boss/memberCard/list").then(res=>{
        commit('GET_CARD_LIST',res.data.items);
      })
    },
    GET_SERVICE_TYPE ({commit}) {
      axios.get('/boss/category/list',{
        params: {
          type_code: 'service'
        }
      }).then(res=>{
        commit('SET_SERVICE_TYPE',res.data);
      })
    },
    GET_GROUPED_SERVICE_TYPE ({commit}) {
      axios.get('/boss/category/list',{
        params: {
          type_code: 'grouped_service',
          is_deleted:0,
        }
      }).then(res=>{
        commit('SET_GROUPED_SERVICE_TYPE',res.data);
      })
    },    
    GET_GUI_GE ({commit},id) {
      return new Promise((resolve,reject)=>{
        axios.get('/boss/product/getServicePriceAttribute',{
          params: {
            type_code: 'service',
            product_id: id
          }
        }).then(res=>{
          commit('SET_GUI_GE',res.data);
          resolve();
        })        
      })
    },
    GET_STORE_BY_GROUP ({commit}) {
      axios.get('/boss/store/list',{params:{
        is_grouped: 1        
      }}).then(res=>{
        commit('SET_STORE_BY_GROUP',res.data);
      })
    }    
  },
  getters: {}
}
