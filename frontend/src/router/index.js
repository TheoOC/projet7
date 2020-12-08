import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

//navigation guards

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/auth/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/post/:post_id',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    beforeEnter: ifAuthenticated,
  }
]

const router = new VueRouter({
  routes
})

export default router
