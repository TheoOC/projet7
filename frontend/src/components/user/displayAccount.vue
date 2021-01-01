<template>
  <div>
    <p>this is the display account component</p>
    <p>email: {{ user.email }}</p>
    <p>username: {{ user.username }}</p>
    <p>user id: {{ user.id }}</p>
  </div>
</template>

<script>
import store from "../../store/index";
import uApi from "../../gateways/user";

export default {
  name: "display-account",
  data: function () {
    return {
      user: {},
    };
  },
  methods: {
    setDefaultInputValues: function () {
      const user_id = store.getters.getUserId;
      uApi
        .getUserInfos(user_id)
        .then((user) => {
          this.user = user;
          console.log(`default input values set`);
        })
        .catch((err) => {
          this.user = null;
          console.log(
            `ther was an error getting the userInfos form the api: ${err}`
          );
        });
    },
  },
  created: function () {
    console.log(`display account created called`);
    this.setDefaultInputValues();
  },
};
</script>