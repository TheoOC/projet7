<template>
  <div>
    <p>this is the edit account component</p>
    <p>email: {{ user.email }}</p>
    <form @submit.prevent="editAccount" method="PUT">
      <label for="username">username</label>
      <input
        required
        v-model="username"
        id="username"
        name="text"
        placeholder="new username"
      />
      <input type="submit" value="Submit" />
    </form>
    <p>user id: {{ user.id }}</p>
    <button @click="deleteAccount">delete account</button>
  </div>
</template>
<script>
import store from "../../store/index";
import uApi from "../../gateways/user";

export default {
  name: "edit-account",
  props: { user: { type: Object, required: true } },
  data: function () {
    return {
      username: "",
    };
  },
  methods: {
    setDefaultInputValues: function () {
      const user_id = store.getters.getUserId;
      uApi
        .getUserInfos(user_id)
        .then((user) => {
          this.username = user.username;
          document.getElementById("username").defaultValue = this.username;
          console.log(`default input values set`);
        })
        .catch((err) => {
          this.username = "";
          console.log(
            `ther was an error getting the userInfos form the api: ${err}`
          );
        });
    },
    editAccount: function () {
      const user_id = store.getters.getUserId;
      const { user } = this;
      uApi
        .updateUser(user, user_id)
        .then(() => {
          console.log(`successfully called update user`);
        })
        .catch((err) => {
          console.log(`failed to call updata user: ${err}`);
        });
    },
    deleteAccount: function () {
      const user_id = store.getters.getUserId;
      uApi
        .deleteUser(user_id)
        .then(() => {
          console.log(`successfully called delete user`);
          store.dispatch("AUTH_LOGOUT");
          this.$router.push("/signup");
        })
        .catch((err) => {
          `failed to call delete user: ${err}`;
        });
    },
  },
  mounted: function () {
    this.setDefaultInputValues();
  },
};
</script>