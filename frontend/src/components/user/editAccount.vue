<template>
  <div class="table-responsive my-1 py-1">
    <table class="table table-user-information">
      <tbody>
        <tr>
          <td>
            <strong> email </strong>
          </td>
          <td class="text-primary">{{ user.email }}</td>
        </tr>
        <tr>
          <td>
            <form @submit.prevent="editAccount" method="PUT">
              <div class="form-group">
                <label for="username"><strong>username</strong></label>
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
              <button class="btn btn-dark" type="submit">
                change username
              </button>
            </form>
          </td>
          <td class="text-primary">{{ user.username }}</td>
        </tr>
        <tr>
          <td>
            <strong> user id </strong>
          </td>
          <td class="text-primary">{{ user.id }}</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-end">
      <button class="btn btn-danger" @click="deleteAccount">
        delete account
      </button>
    </div>
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
    this.setDefaultInputValues();
  },
};
</script>