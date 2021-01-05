<template>
  <div class="container">
    <p>this is the edit account component</p>
    <p>user id: {{ user.id }}</p>
    <p>email: {{ user.email }}</p>
    <form @submit.prevent="editAccount" method="PUT">
      <div class="form-group">
        <label for="username">username</label>
        <input
          required
          v-model="user.username"
          id="username"
          name="text"
          placeholder="new username"
          class="form-control"
        />
      </div>
      <error v-if="error" v-bind:error="error" />
      <button class="btn btn-primary" type="submit">change username</button>
    </form>
    <button class="btn btn-danger" @click="deleteAccount">
      delete account
    </button>
  </div>
</template>
<script>
import store from "../../store/index";
import uApi from "../../gateways/user";
import error from "../../components/error/error";

export default {
  name: "edit-account",
  components: { error },
  data: function () {
    return {
      user: {},
      error: "",
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
          this.error = "";
          console.log(`successfully called update user`);
        })
        .catch((err) => {
          console.log(`failed to call updata user: ${err}`);
          this.error = err;
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