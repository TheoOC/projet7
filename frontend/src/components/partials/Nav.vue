<template>
  <div>
    <nav>
      <div v-if="!isAuth">
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Signup</router-link>
      </div>
      <div v-else>
        <router-link to="/">Home</router-link> | 
        <router-link to="/account">Account</router-link> | 
        <Logout />
      </div>
    </nav>
  </div>
</template>

<script>
import Logout from "../../components/logout";

export default {
  name: "Nav",
  components: {
    Logout,
  },
  data: function () {
    return {};
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>





