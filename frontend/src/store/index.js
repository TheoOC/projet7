import Vue from 'vue'
import Vuex from 'vuex'
import api from '../gateways/auth'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //replace local storage by cokies
    user: {
      token: localStorage.getItem('user-token') || '',
      userId: localStorage.getItem('user-id') || '',
    },
    auth: {
      status: '',
    }
  },
  getters: {
    //check if token is true
    isAuthenticated: state => !!state.user.token,
    authStatus: state => state.auth.status,
    getUserId: state => state.user.userId,
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.auth.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.auth.status = 'success';
      //state.user.token = token;
      Vue.set(state.user, 'token', token);
      Vue.set(state.user, 'userId', localStorage.getItem('user-id'));
      //state.user.userId = localStorage.getItem('user-id');
    },
    AUTH_ERROR: (state) => {
      state.auth.status = 'error'
    },
    AUTH_LOGOUT: (state) => {
      state.user.token = null;
      state.user.userId = null;
      state.auth.status = 'logged out';
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        //commit AUTH_REQUEST mutation
        commit("AUTH_REQUEST");
        //call api
        api.login(user).then((res) => {
          console.log(`in AUTH_REQUEST: ${JSON.stringify(res)}`);
          const token = res.token;
          localStorage.setItem('user-token', token);

          const uid = res.userId;
          localStorage.setItem('user-id', uid);

          console.log("uid====> " + uid);

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

        localStorage.removeItem('user-id');

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
