<template>
  <div class="container rounded my-1 py-1">
    <div class="row">
      <h3 class="col align-self-start">user: {{ user.username }}</h3>
      <button class="btn btn-primary col-3 align-self-end" @click="redirectToProfile">
        got to profile
      </button>
    </div>
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
