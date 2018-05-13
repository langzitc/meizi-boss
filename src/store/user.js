import axios from 'axios'
import types from './types'
import router from '../router'
import Cookies from 'js-cookie'
import iview from 'iview'
import md5 from 'md5'
export default {
    state: {
        sid: "",
        member: {},
        menu: [],
        subMenu: [],
        genderList: [],
        activeId: 0,
        activeId2: 0,
        isLogin: false,
        request: 0,
        path: '',
        setPasswordModal: false
    },
    mutations: {
        ADD_REQUEST (state) {
          state.request++;
        },
        UPDATE_PATH (state,path) {
          state.path = path;
        },
        UPDATE_CHILDREN_MENU (state) {
          let p1 = state.path;
          if(p1.split('/').length === 4){
            state.subMenu.forEach(e=>{
              if(e.subMenu&&e.subMenu.length){
                e.subMenu.forEach(e2=>{
                  if(e2.path === p1){
                    state.activeId2 = e2.id;
                  }
                })
              }else if(e.path === p1){
                state.activeId2 = e.id;
              }
            })
          }else{
            state.activeId2 = 0;
          }
        },
        REDUCE_REQUEST (state) {
          state.request--;
        },
        USER_INIT(state,newState){
          Object.assign(state,newState);
        },
        USER_LOGIN(state,newState){
          Object.assign(state,newState);
          Cookies.set("mzmy_session",JSON.stringify(newState));
          router.push("/admin");
        },
        UPDATE_LOGIN_STATUS (state, status) {
          state.isLogin = status;
        },
        USER_LOGOUT(state){
          state.sid = "";
          state.member = {};
          Cookies.remove("mzmy_session");
          router.push("/login");
        },
        LOCK(state) {
          Cookies.set('locking', '1');
        },
        UNLOCK(state) {
          Cookies.set('locking', '0');
        },
        MENU_INIT(state,newState){
          state.menu = newState;
        },
        MENU_SELECT(state,key = 0){
          let arr = [];
          state.menu.forEach((e)=>{
            if(e.id == (key||state.activeId)&&e.subMenu&&e.subMenu.length){
              arr = JSON.parse(JSON.stringify(e.subMenu));
            }
          })
          state.subMenu = arr;         
        },
        MENU_ACTIVE(state,{path,menu}){
          let p = path.replace(/\s+/g, "");
          menu.forEach((e)=>{
            if(p.includes(e.path.replace(/\s+/g, ""))){
              state.activeId = e.id;
              if(e.subMenu&&e.subMenu.length){
                let b = e.subMenu;
                b.forEach((e2)=>{
                  let c = e2.path.replace(/\s+/g, "");
                  if(e2.subMenu&&e2.subMenu.length){
                    let d = e2.subMenu;
                    d.forEach((e3)=>{
                      if(e3.path.replace(/\s+/g, "") === p){
                        state.activeId2 = e3.id;
                      }
                    })
                  }else if( p === c){
                    state.activeId2 = e2.id;
                  }
                })
              }
            }
          })
        },
        GENDER_LIST(state,newState){
          state.genderList = newState;
        },
        RESET_PASSWORD (state) {
          state.setPasswordModal = !state.setPasswordModal;
        }
    },
    actions: {
        MENU_ACTIVE({commit,dispatch},data){
          commit("MENU_ACTIVE",data);
          commit("MENU_SELECT");
        },
        MENU_INIT({commit,state,rootGetters},force = false){
          return new Promise((resolve,reject)=>{
            if(!force){
              let menu = localStorage.getItem(rootGetters.prefix+"mzmy_menus");
              if(menu){
                commit("MENU_INIT",JSON.parse(menu));
                resolve(JSON.parse(menu));
                return;
              }
            }
            axios.post('/boss/dashboard/menus').then((res)=>{
              commit("MENU_INIT",res.data);
              localStorage.setItem(rootGetters.prefix+"mzmy_menus",JSON.stringify(res.data));
              resolve(res.data);
            }).catch((e)=>{
              reject(e);
            })
          });
        },
        USER_LOGIN({commit,dispatch},params){
            commit('UPDATE_LOGIN_STATUS',true);
            return new Promise((resolve,reject)=>{
                axios.post("/boss/public/login",params).then((res)=>{
                    if(res.code == 200){
                        dispatch("SET_DEFAULT_STORE").then(()=>{
                            commit(types.USER_LOGIN,res.data);
                            commit('UPDATE_LOGIN_STATUS',false);
                            dispatch("MENU_INIT",true);
                            resolve(res.message);
                        })
                    }else{
                        reject(res.message);
                        commit('UPDATE_LOGIN_STATUS',false);
                    }
                }).catch((e)=>{
                    reject();
                    commit('UPDATE_LOGIN_STATUS',false);
                })
            });
        },
        USER_REGISTER({commit},params){
            return new Promise((resolve,reject)=>{
                axios.post("/member/register",params).then((res)=>{
                    if(res.code == 200){
                        resolve(res.message);
                    }else{
                        reject(res.message);
                    }
                }).catch((e)=>{
                    reject(e);
                });
            });
        },
        USER_LOGOUT({commit}){
          return new Promise((resolve,reject)=>{
            axios.post("/member/logout").then((res)=>{
              if(res.code == 200){
                commit('GET_STORE_LIST',[],{root:true});
                commit("USER_LOGOUT");
                resolve();
              }else{
                reject();
              }
            });
          })
        },
        USER_UPDATE(context,params){

        },
        GENDER_LIST(context){
            let gender = localStorage.getItem("mzmy_gender_list");
            if(gender){
              context.commit("GENDER_LIST",JSON.parse(gender));
              return;
            }
            axios.get("/member/genderList").then((res)=>{
              context.commit("GENDER_LIST",res.data);
              localStorage.setItem("mzmy_gender_list",JSON.stringify(res.data));
            });            
        }
    },
    getters: {
      prefix: state=> {
        return state.member.mobile+"_";
      }
    }
}
