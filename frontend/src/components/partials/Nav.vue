<template>
  <div>
    <nav>
      <div v-if="!isAuth">
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Signup</router-link>
      </div>
      <div v-else>
        <router-link to="/">Home</router-link> |
        <router-link :to="`/account/${getUserId}`">Account</router-link>
        |
        <Logout />
      </div>
    </nav>
  </div>
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
  },
};
</script>





