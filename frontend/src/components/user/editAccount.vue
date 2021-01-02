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
  data: function () {
    return {
      user: {},
    };
  },
  methods: {
    setDefaultInputValues: function () {
      const user_id = this.$route.params.user_id;
      uApi
        .getUserInfos(user_id)
        .then((user) => {
          this.user = user;
          document.getElementById("username").defaultValue = this.user.username;
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
      const user_id = this.$route.params.user_id;

      const { username } = this.user;
      console.log(`username: ${this.user.username}`);
      uApi
        .updateUser({ username }, user_id)
        .then(() => {
          console.log(`successfully called update user`);
        })
        .catch((err) => {
          console.log(`failed to call updata user: ${err}`);
        });
    },
    deleteAccount: function () {
      const user_id = this.$route.params.user_id;
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
  created: function () {
    console.log(`edit account created called`);
  },
  mounted: function () {
    this.setDefaultInputValues();
  },
};
</script>