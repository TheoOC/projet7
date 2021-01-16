<template>
  <nav
    class="navbar navbar-expand-lg shadow bg-white navbar-light justify-content-between flex-nowrap flex-row fixed-top"
  >
    <div class="container">
      <a class="navbar-brand float-left" href="/">
        <img
          src="../../assets/images/icon-left-font-monochrome-black.svg"
          class="img-fluid"
          alt="Groupomania_logo"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <div v-if="!isAuth">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li
              class="nav-item active"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <router-link class="nav-link btn m-1" to="/signup"
                >Signup</router-link
              >
            </li>
            <li
              class="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <router-link class="nav-link btn btn-outline-dark m-1" to="/login"
                >Login</router-link
              >
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li
              class="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <router-link class="nav-link active m-1" to="/">Home</router-link>
            </li>

            <li
              class="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <router-link class="nav-link m-1" :to="`/account/${getUserId}`"
                >Account</router-link
              >
            </li>
            <li
              class="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <Logout />
            </li>
            <div v-if="isAdmin">
              <li
                class="nav-item"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <router-link class="nav-link m-1" to="/admin"
                  >admin pannel</router-link
                >
              </li>
            </div>
          </ul>
        </div>
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





