<template>
  <div>
    <h3>Title: {{ title }}</h3>
    <p>content: {{ textContent }}</p>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["title", "textContent"],
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>