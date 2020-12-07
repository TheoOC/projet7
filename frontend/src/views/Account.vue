<template>
  <div>
    <button>uid: {{ this.uid }}</button>
  </div>
</template>
<script>
import store from "../store/index";
import uApi from "../gateways/user";
export default {
  data: function () {
    return {
      uid: "",
      user: {},
    };
  },
  created: function () {
    this.uid = store.getters.getUserId;
    uApi.getUserInfos(this.uid);
  },
};
</script>