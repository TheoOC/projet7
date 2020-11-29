import Vue from 'vue'
import Vuex from 'vuex'
import api from '../gateways/auth'
import axios from 'axios'

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
      state.status = 'success';
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
    AUTH_LOGOUT: (state) => {
      state.token = '';
      console.log(state.token);
      state.status = 'logged out';
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        //commit AUTH_REQUEST mutation
        commit("AUTH_REQUEST");
        //call api
        api.login(user).then((res) => {
          console.log(res);
          const token = res.token;
          localStorage.setItem('user-token', token);
          //set authorization header to token
          axios.defaults.headers.common['Authorization'] = token;
          console.log(`authorization header set: ${axios.defaults.headers.common['Authorization']}`);
          commit("AUTH_SUCCESS", token);
          resolve(res);
        }).catch(() => {
          reject('error');
        })
        //after call to api call the mutation
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem('user-token');
        //delete Authorization header
        delete axios.defaults.headers.common['Authorization'];
        console.log(`Authorization header deleted: ${axios.defaults.headers.common['Authorization']}`);
        resolve();
      })
    }
  },
  modules: {
  }
})
