<template>
  <div class="alert alert-danger"> {{ error }}</div>
</template>
<script>
export default {
  name: "errorComponent",
  props: { error: { type: String, required: true } },
  data: function () {
    return {};
  },
};
</script>