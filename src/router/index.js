import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home')
const Login = () => import(/* webpackChunkName: "login" */ '@/components/Login')
const Register = () => import(/* webpackChunkName: "register" */ '@/components/Register')
const Admin = () => import(/* webpackChunkName: "admin" */ '@/components/Admin')
const Store = () => import(/* webpackChunkName: "admin" */ '@/components/admin_components/workbench/home')
const Appointment = () => import(/* webpackChunkName: "admin" */ '@/components/admin_components/appointment')
const StoreManager = () => import(/* webpackChunkName: "store" */ '@/components/admin_components/storemanager')
const Locking = () => import(/* webpackChunkName: "home" */ '@/components/locking-page')
const ErrorPage = () => import(/* webpackChunkName: "home" */ '@/components/404/404')
const AdminIndex = () => import(/* webpackChunkName: "admin" */ '@/components/admin_components')
const StoreIndex = () => import(/* webpackChunkName: "store" */ '@/components/admin_components/storemanager/home')

//收银台
const Workbench = () => import(/* webpackChunkName: "admin" */ '@/components/admin_components/workbench')
//会员中心
const Member = () => import(/* webpackChunkName: "admin" */ '@/components/admin_components/member')
//移动商城
const Shop = () => import(/* webpackChunkName: "admin" */ '@/components/admin_components/mobileshop')
//短信中心
const Message = () => import(/* webpackChunkName: "message" */ '@/components/admin_components/message')
export default new Router({
  routes: [
    {
      path: '*',
      name: '404',
      component: ErrorPage
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      redirect: {
        path: '/login'
      }
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
        path: '',
        redirect: {
          path: '/admin/workbench'
        }
      },{
        path: 'market',
        component: Message,
        children: [{
          path: '',
          redirect: {
            path: 'message'
          }
        },{
          path: 'message',
          name: 'message',
          component: Message
        }]
      },{
        path: 'revenuestatement',
        component: Member,
        children: [{
          path: '',
          redirect: {
            path: 'memo'
          }
        },{
          path: 'businessrecord',
          name: 'businessrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/businessrecord'],resolve)
          }
        },{
          path: 'financialmanagement',
          name: 'financialmanagement',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/cwgl/financialManagement'],resolve)
          }
        },{
          path: 'commission',
          name: 'commission',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/cwgl/commission'],resolve)
          }
        },{
          path: 'payroll',
          name: 'payroll',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/cwgl/payroll'],resolve);
          }
        },{
          path: 'czkkrecord',
          name: 'czkkrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/czkkrecord'],resolve)
          }
        },{
          path: 'kdxfrecord',
          name: 'kdxfrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/kdxfrecord'],resolve)
          }
        },{
          path: 'memo',
          name: 'memo',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/memo'],resolve)
          }
        },{
          path: 'mobilepaymentrecord',
          name: 'mobilepaymentrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/Mobilepaymentrecord'],resolve)
          }
        },{
          path: 'ncrecord',
          name: 'ncrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/ncrecord'],resolve)
          }
        },{
          path: 'refundrecord',
          name: 'refundrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/refundrecord'],resolve)
          }
        },{
          path: 'Tcdgrecord',
          name: 'Tcdgrecord',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/yyjl/tcdgrecord'],resolve)
          }
        },{
          path: 'statisticalreport',
          name: 'statisticalreport',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/statisticalReport'],resolve)
          }
        }]
      },{
        path: 'shop',
        component: Shop,
        children: [{
          path: '',
          redirect: {
            path: 'list'
          }
        },{
          path: 'list',
          name: 'list',
          component: function (resolve) {
            require(['@/components/admin_components/member/list'],resolve)
          }
        },{
          path: 'analysis_add',
          name: 'analysis_add',
          component: function (resolve) {
            require(['@/components/admin_components/member/analysis_add'],resolve)
          }
        },{
          path: 'analysis_activity',
          name: 'analysis_activity',
          component: function (resolve) {
            require(['@/components/admin_components/member/analysis_activity'],resolve)
          }
        },{
          path: 'analysis_balance',
          name: 'analysis_balance',
          component: function (resolve) {
            require(['@/components/admin_components/member/analysis_balance'],resolve)
          }
        },{
          name: 'analysis_recharge',
          path: 'analysis_recharge',
          component: function (resolve) {
            require(['@/components/admin_components/member/analysis_recharge'],resolve)
          }
        },{
          path: 'product',
          name: 'product',
          component: function (resolve) {
            require(['@/components/admin_components/mobileshop/product'],resolve)
          }
        },{
          path: 'promotion',
          name: 'promotion',
          component: function (resolve) {
            require(['@/components/admin_components/mobileshop/promotion'],resolve)
          }
        },{
          path: 'employeeidea',
          name: 'employeeidea',
          component: function (resolve) {
            require(['@/components/admin_components/mobileshop/employeeidea'],resolve)
          }
        },{
          path: 'looppic',
          name: 'looppic',
          component: function (resolve) {
            require(['@/components/admin_components/mobileshop/looppic'],resolve)
          }
        },{
          path: 'evaluate',
          name: 'evaluate',
          component: function (resolve) {
            require(['@/components/admin_components/mobileshop/evaluate'],resolve)
          }
        },{
          path: 'coupon',
          name: 'coupon',
          component: function (resolve) {
            require(['@/components/admin_components/mobileshop/coupon'],resolve)
          }
        }]
      },{
        path: 'workbench',
        component: Workbench,
        children: [{
          path: '',
          component: AdminIndex
        },{
          path: 'cashier',
          name: 'cashier',
          component: function (resolve) {
            require(['@/components/admin_components/workbench/cashier'],resolve)
          }
        },{
          path: 'dayexpenditure',
          name: 'dayexpenditure',
          component: function (resolve) {
            require(['@/components/admin_components/workbench/dayExpenditure'],resolve)
          }
        },{
          path: 'guadan',
          name: 'guadan',
          component: function (resolve) {
            require(['@/components/admin_components/workbench/guadan'],resolve)
          }
        },{
          path: 'makeappointment',
          name: 'makeappointment',
          component: function (resolve) {
            require(['@/components/admin_components/workbench/makeAppointment'],resolve)
          }
        },{
          path: 'makecard',
          name: 'makecard',
          component: function (resolve) {
            require(['@/components/admin_components/workbench/makeCard'],resolve)
          }
        },{
          path: 'todaymemo',
          name: 'todaymemo',
          component: function (resolve) {
            require(['@/components/admin_components/workbench/todayMemo'],resolve)
          }
        }]
      },{
        path: 'storemanager',
        component: StoreManager,
        children: [{
          path: '',
          component: StoreIndex
        },{
          path: 'commoditymanagement',
          name: 'commoditymanagement',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/commodityManagement'],resolve)
          }
        },{
          path: 'ppxx',
          name: 'ppxx',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/store-ppxx'],resolve);
          }
        },{
          path: 'mdgl',
          name: 'mdgl',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/store-mdgl'],resolve);
          }
        },{
          path: 'glysz',
          name: 'glysz',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/administrator'],resolve);
          }
        },{
          path: 'ygzl',
          name: 'ygzl',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/yggl-ygzl'],resolve);            
          }
        },{
          path: 'xtrz',
          name: 'xtrz',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/xtsz-xtrz'],resolve);            
          }
        },{
          path: 'jclxsz',
          name: 'jclxsz',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/jcsz-jclxsz'],resolve);            
          }
        },{
          path: 'fwxm',
          name: 'fwxm',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/jcsz-fwxm'],resolve);            
          }
        },{
          path: 'serviceitems',
          name: 'serviceitems',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/serviceItems'],resolve);            
          }
        },{
          path: 'membershipcard',
          name: 'membershipcard',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/membershipCard'],resolve);            
          }
        },{
          path: 'lctc',
          name: 'lctc',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/jcsz-lctc'],resolve);            
          }
        },{
          path: 'hykgl',
          name: 'hykgl',
          component: function (resolve){
            require(['@/components/admin_components/storemanager/jcsz-hykgl'],resolve);            
          }
        },{
          path: 'schedulingsettings',
          name: 'schedulingsettings',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/schedulingSettings'],resolve)
          }
        },{
          path: 'staffreservation',
          name: 'staffreservation',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/staffReservation'],resolve)
          }
        },{
          path: 'reservationsettings',
          name: 'reservationsettings',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/reservationSettings'],resolve)
          }
        },{
          path: 'royaltysetting',
          name: 'royaltysetting',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/royaltySetting'],resolve)
          }
        },{
          path: 'serviceroyaltysetting',
          name: 'serviceroyaltysetting',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/serviceRoyaltySetting'],resolve)
          }
        },{
          path: 'cardroyaltysetting',
          name: 'cardroyaltysetting',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/cardRoyaltySetting'],resolve)
          }
        },{
          path: 'packageroyaltysetting',
          name: 'packageroyaltysetting',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/packageRoyaltySetting'],resolve);
          }
        },{
          path: 'timeset',
          name: 'timeset',
          component: function (resolve) {
            require(['@/components/admin_components/storemanager/timeSet'],resolve)
          }
        }]
      },{
        path: 'set',
        name:'set',
        component: Store
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: 'locking',
      name: 'locking',
      component: Locking
    }
  ]
})
