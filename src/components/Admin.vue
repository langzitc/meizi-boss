<style lang="less">
  @import '../theme/base.less';
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    min-height: 600px;
    overflow-y: auto;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 80%;
    height: auto;
    margin: 15px;
    overflow: hidden;
    background: @main-color;
    border-radius: 4px;
    width: 100%;
  }
  .layout-assistant{
    width: 100%;
    height: inherit;
  & a{
      color: #657180;
    }
  }
  .layout-content-main{
    padding: 10px;
    min-height: 600px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    min-height: 100%;
  & a{
      color: #657180;
    }
  }
  .layout-header{
    height: 60px;
    background: #495060;
    z-index: 9999;
    line-height: 60px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #fff;
    border-radius: 3px;
    margin: 15px auto;
  & .un-text{
      line-height: 30px;
    }
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text{
  .layout-menu-left{
    text-align: left;
  }
  .layout-first{
    display: none;
  }
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .h-menu-item{
    padding: 0 15px;
  }
  .layout-menu-left{
    background-color: #495060;
  }
  .layout-left-top{
    text-align: center;
    background-color: @primary-color;
  a{
    color: #fff;
  }
  .logos{
    width: 100%;
    height: 60px;
    background-size: contain;
    background-position: center center;
    background-origin: content-box;
    background-repeat: no-repeat;
  }
  }
  .right-items{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
    align-items: center;
  }
  .ril-s-l{
    margin-left: 10px;
  }
  .right-item-lit{
    z-index: 999;
    font-size: 14px;
  img{
    display: table-cell;
    vertical-align: middle;
  }
  a{
    color: #fff;
  &:hover{
     color: #fff;
   }
  }
  }
  .logo-mobile{
    position: absolute;
    left: 15px;
    top: 5px;
    width: 150px;
  }
  @keyframes menuSliderShow {
    from{
      left: 100%;
    }
    to{
      left: 0;
    }
  }
  @keyframes menuSliderHide {
    from{
      left: 0;
    }
    to{
      left: 100%;
    }
  }
  .mobile{
    display: block;
    position: absolute;
    top: 60px;
    width: 100%;
    left: 100%;
    z-index: 999999;
    animation: menuSliderShow .3s linear forwards;
    -webkit-animation: menuSliderShow .3s linear forwards;
  .layout-left-top{
    display: none;
  }
  }
  .mobile.showMenu{
    animation: menuSliderHide .3s linear forwards;
    -webkit-animation: menuSliderHide .3s linear forwards;
  }
  .sys-util{
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 0 10px;
    &:hover{
     background-color: @slider-color;
    }
    .ivu-dropdown-item{
      text-align: left;
    }
  }
  .layout-top-menu .ivu-menu-item-selected{
    background-color: @slider-color;
    color: @text-color;
  }
  .store-select{
  .ivu-select-dropdown{
    z-index: 99999;
  }
  .ivu-select-selected-value{
    text-align: center;
  }
  .ivu-select-selection{
    background-color: #495060;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 0;
  }
  }
  .layout-menu-left .ivu-menu-item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu{
    padding: 0 10px;
  }  
</style>
<template>
  <div class="layout" :class="{'layout-hide-text': isToggle}">
    <Row type="flex" style="min-height: 100%">
      <i-col :xs="{span: isToggle ? 0 : xsLeft}" :sm="{span: isToggle ? 0 : smLeft}" :md="{span: isToggle ? 3 : mdLeft}" :lg="{span: isToggle ? 2 : lgLeft}" class="layout-menu-left" :class="{'mobile': isMobile,'showMenu': mmShowState}">
        <div class="layout-left-top">
          <div class="logos" v-bind:style="{padding: '5px 2px',backgroundImage: 'url('+logo+')'}"></div>
        </div>
        <Menu accordion ref="menu" :active-name="activeId2"  theme="dark" width="auto" @on-select="menuSelect2">
          <template v-for="el in subMenu">
            <template v-if="!el.subMenu">
              <router-link :to="el.path">
                <Menu-item :name="el.id">
                  <Icon :title="el.name" :type="el.iconType" :size="iconSize" :color="el.iconColor"></Icon>
                  <span class="layout-text layout-first">{{el.name}}</span>
                </Menu-item>
              </router-link>
            </template>
            <template v-if="el.subMenu">
              <Submenu :name="el.id">
                <template slot="title">
                  <Icon :title="el.name" :type="el.iconType" :size="iconSize" :color="el.iconColor" style="margin-right: 6px"></Icon>
                  <span class="layout-text layout-first">{{el.name}}</span>
                </template>
                <template v-for="el2 in el.subMenu">
                  <router-link :to="el2.path">
                    <Menu-item :name="el2.id">
                      <span class="layout-text">{{el2.name}}</span>
                    </Menu-item>
                  </router-link>
                </template>
              </Submenu>
            </template>
          </template>
        </Menu>
      </i-col>
      <i-col :xs="{span: isToggle ? 24 : xsRight}" :sm="{span: isToggle ? 24 : smRight}" :md="{span: isToggle ? 21 : mdRight}" :lg="{span: isToggle ? 21 : lgRight}">
        <div class="layout-header">
          <i-col :xs="0" :sm="0" :md="17" :lg="12" class="layout-top-menu">
            <Menu mode="horizontal" :active-name="activeId" ref="menu2" theme="dark" @on-select="menuSelect">
              <div class="layout-assistant">
                <template v-for="el in menu">
                  <router-link :to="el.path">
                    <Menu-item :name="el.id" class="h-menu-item">
                      <Icon :type="el.iconType" size="18" :color="el.iconColor"></Icon>
                      {{el.name}}
                    </Menu-item>
                  </router-link>
                </template>
              </div>
            </Menu>
          </i-col>
          <i-col :xs="24" :sm="24" :md="7" :lg="12" class="text-right">
            <div class="logo-mobile visible-xs visible-sm">
              <img src="../../static/logo.png" alt="logo" class="img-responsive">
            </div>
            <div class="right-items">
              <div class="right-item-lit hidden-xs hidden-sm hidden-md">
                  <span class="sys-util" v-on:click="fullScreen">
                    <Icon :type="isFullScreen ? 'android-contract' : 'android-expand'" size="20" color="#fff"></Icon>
                  </span>
              </div>
              <div class="right-item-lit hidden-xs hidden-sm hidden-md">
                  <span class="sys-util" v-on:click="lock">
                    <Icon type="android-lock" size="22" color="#fff"></Icon>
                  </span>
              </div>
              <div class="right-item-lit hidden-xs hidden-sm hidden-md">
                  <span class="sys-util" v-on:click="goHome">
                    <Icon type="android-home" size="22" color="#fff"></Icon>
                  </span>
              </div>               
              <div class="right-item-lit text-left" style="width:120px;position:relative">
                  <span class="sys-util">
                  <Dropdown trigger="click" placement="bottom-end" style="position:absolute;top:-2px;right:10px">
                    <a href="javascript:void(0)">
                      <Badge count="0">
                        <Avatar size="small" :src="avatorPath" />
                      </Badge>
                      <span style="margin-left:10px">{{userName | limit(4)}}</span>
                    </a>
                    <DropdownMenu slot="list">
                      <span v-on:click="resetPassword"><DropdownItem><Icon type="gear-a" size="14"></Icon><span class="ril-s-l">密码修改</span></DropdownItem></span>
                      <span v-on:click="destroy"><DropdownItem><Icon type="android-exit" size="14"></Icon><span class="ril-s-l">注销</span></DropdownItem></span>
                    </DropdownMenu>
                  </Dropdown>
                  </span>
              </div>
              <div class="store-select">
                <select-store style="width: 100px;" :home="true"></select-store>
              </div>                            
              <div class="right-item-lit visible-xs visible-sm">
                <i-button type="text" @click="toggleMobileMenu">
                  <Icon type="navicon" size="32" color="#fff"></Icon>
                </i-button>
              </div>                         
            </div>
          </i-col>
        </div>
        <div class="layout-content">
          <div class="layout-content-main" style="position:relative">        
            <transition>
                <router-view></router-view>
            </transition>
          </div>
        </div>
        <div class="layout-copy">
          2017-2020 &copy; 美自美业
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  import util from '../util'
  import Cookies from 'js-cookie'
  import SelectStore from './admin_components/store_select'
  import { mapState } from 'vuex'
  export default {
    name: "Admin",
    components: {
    },
    data () {
      return {
        logo: '../../static/logo.png',
        mmShowState: true,
        isMobile: false,
        isToggle: false,
        xsLeft: 0,
        xsRight: 24,
        smLeft: 0,
        smRight: 24,
        mdLeft: 5,
        mdRight: 19,
        lgLeft: 4,
        lgRight: 20,
        isFullScreen: false,
        lockScreenSize: 0
      };
    },
    computed: {
      iconSize () {
        return this.isToggle ? 28 : 16;
      },
      avatorPath () {
        return this.$store.state.user.member.avatar||'../static/timg.jpeg';
      },
      userName () {
        return this.$store.state.user.member.nick_name||this.$store.state.user.member.mobile;
      },
      ...mapState({
         isLoadMenu: state => state.user.isLoadMenu,
         activeId2: state =>  state.user.activeId2,
         activeId: state => state.user.activeId,
         subMenu: state => state.user.subMenu,
         menu: state => state.user.menu
      })
    },
    methods: {
      toggleClick () {
        this.isToggle = !this.isToggle;
      },
      menuSelect (key) {
        this.$store.commit("MENU_SELECT",key);
        setTimeout(()=>{
          this.$store.commit('UPDATE_PATH',this.$route.path);
          this.$store.commit('UPDATE_CHILDREN_MENU');
          this.$nextTick(()=>{
            this.$refs.menu2.updateActiveName();
            this.$refs.menu.updateActiveName();
          })
        },300)
      },
      menuSelect2 (key) {

      },
      destroy(){
        this.$store.dispatch("USER_LOGOUT").then(()=>{
          this.$Message.success("注销成功");
        }).catch(()=>{
            this.$Message.error("注销失败");
        });
      },
      resetPassword () {
        this.$store.commit("RESET_PASSWORD");
      },
      toggleMobileMenu () {
        this.mmShowState = !this.mmShowState;
      },
      fullScreen () {
        let f = util.isFullscreen();
        this.isFullScreen = !f;
        f ? util.exitFullscreen() : util.launchFullscreen(document.documentElement);
      },
      lock () {
        let lockScreenBack = document.getElementById('lock_screen_back');
        lockScreenBack.style.transition = 'all 3s';
        lockScreenBack.style.zIndex = 10000;
        lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px rgba(159,29,73,1) inset';
        this.$store.commit('LOCK');
        Cookies.set(this.$store.getters.prefix+'last_page_path', this.$route.path); // 本地存储锁屏之前打开的页面以便解锁后打开
        setTimeout(() => {
          lockScreenBack.style.transition = 'all 0s';
        this.$router.push({
          name: 'locking'
        });
      }, 800);
      },
      goHome () {
        this.$router.push({
          path: '/admin/workbench'
        })
        this.$refs.menu2.currentActiveName = this.activeId;      
      },
      menuInit () {
          this.$store.dispatch("MENU_INIT").then((menu)=>{
            this.$store.dispatch("MENU_ACTIVE",{
              path: this.$route.path,
              menu: menu
            });
            this.$nextTick(()=>{
              this.$refs.menu2.updateActiveName();
              this.$refs.menu.updateActiveName();
            })
          });        
      }
    },
    mounted () {
      if(!this.$store.state.story.storeList.length){
        this.$store.dispatch("GET_STORE_LIST");
      }    
      this.menuInit();
      let init = ()=>{
        if(document.body.clientWidth>1000){
          this.isMobile = false;
        }else{
          this.isMobile = true;
        }
      }
      let lockScreenBack = document.getElementById('lock_screen_back');
      let x = document.body.clientWidth;
      let y = document.body.clientHeight;
      let r = Math.sqrt(x * x + y * y);
      let size = parseInt(r);
      this.lockScreenSize = size;
      window.addEventListener('resize', () => {
        let x = document.body.clientWidth;
      let y = document.body.clientHeight;
      let r = Math.sqrt(x * x + y * y);
      let size = parseInt(r);
      this.lockScreenSize = size;
      this.isToggle = false;
      lockScreenBack.style.transition = 'all 0s';
      lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
      init();
    });
      lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
      init();
    },
    components: {
      SelectStore
    }
  }
</script>
