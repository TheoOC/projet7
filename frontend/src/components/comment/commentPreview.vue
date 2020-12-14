<template>
  <div class="container">
    <h3>{{ comment }}</h3>
    <p>{{ comment.textContent }}</p>
    <button @click="redirectToEditComment">edit comment</button>
  </div>
</template>

<script>
export default {
  name: "commentPreview",
  props: ["comment"],
  data: function () {
    return {};
  },
  methods: {
    redirectToEditComment: function () {
      this.$router.push(`/comment/${this.comment.id}/edit`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 5px solid red;
}
</style>