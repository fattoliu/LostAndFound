import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import lost from './module/lost'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    route: null
  },
  mutations: {
    updateRoute(state, obj) {
      state.route = obj
    },
  },
  actions: {},
  modules: {
    user,
    lost
  }
})
