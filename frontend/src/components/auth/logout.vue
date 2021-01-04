<template>
  <button @click="logout" class="btn btn-outline-warning mx-1">LOGOUT</button>
</template>
<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    logout: function () {
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>