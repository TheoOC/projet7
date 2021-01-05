<template>
  <div class="vue-template">
    <h2>{{ errorMessage }}</h2>
    <div v-if="disconnect == true">
      <p>try logging in again</p>
      <router-link class="btn btn-outline-warning" to="/login"
        >Login</router-link
      >
      <router-link class="btn btn-outline-warning" to="/signup"
        >Signup</router-link
      >
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
};
</script>