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
            <strong> username </strong>
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
  </div>
</template>

<script>
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
      const user_id = this.$route.params.user_id;
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
    this.setDefaultInputValues();
  },
};
</script>