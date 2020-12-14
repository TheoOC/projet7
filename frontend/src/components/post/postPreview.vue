<template>
  <div class="container">
    <button @click="redirectToPost">go to post {{ post.id }}</button>
    <h3>Title: {{ post.title }}</h3>
    <p>content: {{ post.textContent }}</p>
    <p>UserId that created the post: {{ post.UserId }}</p>
  </div>
</template>

<script>
export default {
  name: "postPreview",
  props: ["post"],
  data: function () {
    return {};
  },
  methods: {
    redirectToPost: function () {
      this.$router.push(`/post/${this.post.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 5px solid red;
}
</style>