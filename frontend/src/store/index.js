import Vue from 'vue'
import Vuex from 'vuex'
import api from '../gateways/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //replace local storage by cokies
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  getters: {
    //check if token is true
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success',
        state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
  },
  actions: {
    AUTH_REQUEST: () => {
      return new Promise((resolve, reject) => {
        //commit AUTH_REQUEST mutation
        //context.commit('AUTH_REQUEST')
        //call api
        api.login().then(() => {
          resolve('success');
        }).catch(() => {
          reject('error');
        })
        //after call to api call the mutation
      });
    },
  },
  modules: {
  }
})
