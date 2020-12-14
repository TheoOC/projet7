<template>
  <div>
    <p>this is the display account component</p>
    <p>email: {{ user.email }}</p>
    <p>username: {{ user.username }}</p>
    <p>user id: {{ user.id }}</p>
  </div>
</template>
<script>
export default {
  name: "display-account",
  props: ["user"],
  data: function () {
    return {};
  },
};
</script>