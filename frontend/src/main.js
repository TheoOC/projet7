import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')

//handle auto-authentification
if (token) {
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  console.log(`auto logged in: authorization header: ${axios.defaults.headers.common['Authorization']}`);
  console.log(`user id: ${store.getters.getUserId}`)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
