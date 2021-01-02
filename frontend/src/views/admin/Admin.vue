<template>
  <div>
    <p>this is the admin pannel</p>
    <userPreview v-for="user in users" v-bind:user="user" :key="user.id" />
  </div>
</template>
<script>
import userPreview from "../../components/admin/userPreview";
import uApi from "../../gateways/user";

export default {
  name: "Admin",
  components: { userPreview },
  data: function () {
    return {
      users: [],
    };
  },
  methods: {
    getAllUsers: function () {
      uApi
        .getAllUsers()
        .then((res) => {
          this.users.splice(0, this.users.length);
          res.data.forEach((user) => {
            this.users.unshift(user);
          });
          console.log(res);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    },
  },
  created: function () {
    console.log(`in admin created`);
    this.getAllUsers();
  },
};
</script>