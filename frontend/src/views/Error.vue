<template>
  <div>
    <h2>{{ errorMessage }}</h2>
    <div v-if="disconnect == true">
      <p>try logging in again</p>
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
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