<template>
  <div class="container border border-primary rounded">
    <button class="btn" @click="redirectToProfile">got to profile</button>
    <h3>username: {{ user.username }}</h3>
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
