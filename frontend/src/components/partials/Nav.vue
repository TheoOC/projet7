<template>
  <nav
    class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top"
  >
    <div class="container">
      <div v-if="!isAuth">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link mx-1" to="/signup">Signup</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary mx-1" to="/login"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="btn btn-outline-primary mx-1" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="btn btn-outline-success mx-1"
              :to="`/account/${getUserId}`"
              >Account</router-link
            >
          </li>
          <li class="nav-item">
            <Logout />
          </li>
          <div v-if="isAdmin">
            <li class="nav-item">
              <router-link class="btn btn-danger mx-1" to="/admin"
                >admin pannel</router-link
              >
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logout from "../../components/auth/logout";
import store from "../../store/index";

export default {
  name: "Nav",
  components: {
    Logout,
  },
  data: function () {
    return {};
  },
  computed: {
    getUserId() {
      console.log(`GETTING NAV USER ID: ${store.getters.getUserId}`);
      return store.getters.getUserId;
    },
    isAuth() {
      return store.getters.isAuthenticated;
    },
    isAdmin() {
      return store.getters.isAdmin;
    },
  },
};
</script>





