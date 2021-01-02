<template>
  <div class="container">
    <h3>username: {{ user.username }}</h3>
    <button @click="redirectToProfile">got to profile</button>
  </div>
</template>
<script>
export default {
  name: "userPreview",
  props: { user: { type: Object, required: true } },
  data: function () {
    return {};
  },
  methods: {
    redirectToProfile: function () {
      this.$router.push(`/account/${this.user.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 5px solid red;
}
</style>