import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import pApi from '../gateways/post'
import cApi from '../gateways/comment'

Vue.use(VueRouter)

//navigation guards
//allow only not authenticated user to
const ifNotAuthenticated = (to, from, next) => {
  console.log(`only non-authenticated users can access this route`);
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

//allow only authenticated user to
const ifAuthenticated = (to, from, next) => {
  console.log(`only authenticated users can access this route`);
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const ifAdmin = (to, from, next) => {
  console.log(`only admins can access this route`);
  if (store.getters.isAuthenticated) {
    if (store.getters.isAdmin) {
      next()
      return
    }
  }
  next('/')
}

const hasPostPermissions = (to, from, next) => {
  console.log(`checking if user can edit post ${to.params.post_id} `);
  if (store.getters.isAuthenticated) {
    console.log(`user is authenticated`)
    //get post id from params
    const post_id = to.params.post_id;
    pApi.getPost(post_id)
      .then((post) => {
        //compare the userId from the post to ther userId from the store
        const sUid = store.getters.getUserId;
        const isAdmin = store.getters.isAdmin;
        console.log(`
        store user id : ${sUid}
        store is admin : ${isAdmin}
        does user have permission to edit: ${post.UserId == sUid || isAdmin}
        `);

        if ((post.UserId == sUid || isAdmin) === true) {
          console.log(`user has permission to edit post ${post_id}`);
          next();
          return;
        }
        else {
          console.log(`user does not have permission to edit post ${post_id} `);
          next('/');
          return;
        }
      })
      .catch((error) => {
        console.log(`there was an error trying to get the post ${post_id}: 
        ${error} 
        ...redirecting to home`);
        next('/');
        return;
      });
  }
  else {
    console.log(`user not authenticated redirecting to login`);
    next('/login');
    return;
  }
}

const hasCommentPermissions = (to, from, next) => {

  console.log(`checking if user can edit comment ${to.params.comment_id} `);
  if (store.getters.isAuthenticated) {
    console.log(`user is authenticated`)
    //get post id from params
    const comment_id = to.params.comment_id;
    cApi.getComment(comment_id)
      .then((comment) => {
        //compare the userId from the comment to ther userId from the store
        const sUid = store.getters.getUserId;
        const isAdmin = store.getters.isAdmin;
        console.log(`
        store user id : ${sUid}
        store is admin : ${isAdmin}
        does user have permission to edit: ${comment.UserId == sUid || isAdmin}
        `);
        if ((comment.UserId == sUid || isAdmin) === true) {
          console.log(`user has permission to edit comment ${comment_id}`);
          next();
          return;
        }
        else {
          console.log(`user does not have permission to edit comment ${comment_id} `);
          next('/');
          return;
        }
      })
      .catch((error) => {
        console.log(`there was an error trying to get the comment ${comment_id}:
        ${error}
        ...redirecting to home`);
        next('/');
        return;
      });
  }
  else {
    console.log(`user not authenticated redirecting to login`);
    next('/login');
    return;
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/auth/Signup.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Admin.vue'),
    beforeEnter: ifAdmin
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/account/:user_id',
    name: 'Account',
    component: () => import('../views/user/Account.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/post/:post_id',
    name: 'Post',
    component: () => import('../views/post/Post.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/post/:post_id/edit',
    name: 'EditPost',
    component: () => import('../views/post/EditPost.vue'),
    beforeEnter: hasPostPermissions,
  },
  {
    path: '/comment/:comment_id/edit',
    name: 'EditComment',
    component: () => import('../views/comment/EditComment.vue'),
    props: true,
    beforeEnter: hasCommentPermissions,
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/error/Error.vue'),
    props: true,
  },
  {
    path: '*',
    component: () => import('../views/error/PageNotFound.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
