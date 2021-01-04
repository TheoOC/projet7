<template>
  <div class="vue-template">
    <Nav />
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/partials/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
//#app {
//font-family: Avenir, Helvetica, Arial, sans-serif;
//-webkit-font-smoothing: antialiased;
//-moz-osx-font-smoothing: grayscale;
//text-align: center;
//color: #2c3e50;
//}
</style>
