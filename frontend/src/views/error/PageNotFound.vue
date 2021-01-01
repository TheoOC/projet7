<template>
  <div>
    <h2>404 not found</h2>
  </div>
</template>
<script>
export default {
  created: function () {
    // Redirect outside the app using plain old javascript
    this.$router.push("/");
  },
};
</script>