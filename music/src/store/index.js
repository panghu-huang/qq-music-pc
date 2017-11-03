import Vuex from 'vuex'
import Vue from 'vue'
import state from './states'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations
})
