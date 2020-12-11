<template>
  <div class="container">
    <h3>{{ comment }}</h3>
    <p>{{ comment.textContent }}</p>
  </div>
</template>

<script>
export default {
  name: "commentPreview",
  props: ["comment"],
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 5px solid red;
}
</style>