<template>
  <div>
    <p>email: {{ user.email }}</p>
    <p>username: {{ user.username }}</p>
    <p>user id: {{user.id}}</p>
    <!--<p>{{}}</p>-->
  </div>
</template>
<script>
import store from "../store/index";
import uApi from "../gateways/user";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    store.getters.getUserId;
    uApi
      .getUserInfos(store.getters.getUserId)
      .then((user) => {
        this.user = user;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  },
};
</script>