import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

import interceptorSetup from './helpers/interceptors';
interceptorSetup();
import autoAuthentication from './helpers/auto-authentication';
autoAuthentication();

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
