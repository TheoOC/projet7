<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/partials/Nav.vue";
import axios from "axios";

export default {
  components: {
    Nav,
  },
  created: function () {
    //handle unauthorized requests
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch("AUTH_LOGOUT");
          // you can also redirect to /login if needed !
          this.$router.push({
            name: "Error",
            params: { errorMessage: "401 Unauthorized", disconnect: true },
          });
          resolve();
        }
        reject(err);
      });
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
