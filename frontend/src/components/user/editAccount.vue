<template>
  <div>
    <p>this is the edit account component</p>
    <p>email: {{ user.email }}</p>
    <form @submit.prevent="editAccount" method="PUT">
      <label for="username">username</label>
      <input
        required
        v-model="user.username"
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
  props: ["user"],
  data: function () {
    return {};
  },
  methods: {
    setDefaultInputValues: function () {
      document.getElementById("username").defaultValue = this.user.username;
      console.log(`default input values set`);
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
    created: function () {
      console.log("in created from edit account");
      uApi
        .getUserInfos(store.getters.getUserId)
        .then((user) => {
          this.user = user;
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      this.setDefaultInputValues();
    },
  },
};
</script>