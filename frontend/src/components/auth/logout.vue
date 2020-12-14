<template>
  <button @click="logout">LOGOUT</button>
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