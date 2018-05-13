
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import plane from './plane'
import common from './common'
import story from './story'
import order from './order'
import commodity from './commodity'
import appointment from './appointment'
import source from './source'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
      user,
      plane,
      common,
      story,
      order,
      commodity,
      appointment,
      source
    }
})
