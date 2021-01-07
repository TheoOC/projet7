<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-template">
        <div class="container rounded">
          <h2>{{ errorMessage }}</h2>
          <div v-if="disconnect == true">
            <p>try logging in again</p>
            <router-link class="btn btn-outline-dark m-1" to="/login"
              >Login</router-link
            >
            <router-link class="btn btn-outline-dark m-1" to="/signup"
              >Signup</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "errorView",
  props: {
    errorMessage: { type: String, required: true },
    disconnect: { type: Boolean, default: false },
  },
  data: function () {
    return {};
  },
  created: function () {
    if (!this.errorMessage) {
      this.$router.push("/");
    }
  },
};
</script>