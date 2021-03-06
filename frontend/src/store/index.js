import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem('user-token') || '',
      userId: localStorage.getItem('user-id') || '',
      isAdmin: localStorage.getItem('is-admin') || '',
    },
    auth: {
      status: '',
    }
  },
  actions,
  getters,
  mutations,
})
