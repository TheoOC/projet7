<template>
  <div>
    <p>Error: {{ errorMessage }}</p>
  </div>
</template>
<script>
export default {
  name: "errorComponent",
  props: { errorMessage: { type: String, required: true } },
  data: function () {
    return {};
  },
};
</script>