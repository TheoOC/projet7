<template>
  <div class="vue-template">
    <Nav />
    <div class="App">
      <router-view />
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

