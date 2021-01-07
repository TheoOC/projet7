<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-template">
        <div class="container rounded">
          <h2>404 not found</h2>
        </div>
      </div>
    </div>
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