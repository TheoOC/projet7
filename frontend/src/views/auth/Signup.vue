<template>
  <div>
    <form class="signup" @submit.prevent="signup">
      <h1>Sign up</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Snoopy" />

      <label>Username</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />

      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit" value="submit">signup</button>
    </form>
  </div>
</template>

<script>
import auth from "../../gateways/auth";

export default {
  data: function () {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    signup: function () {
      const { email, username, password } = this;
      auth
        .signup({ email, username, password })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(`signup error: ${error}`);
        });
      console.log("called signup method");
    },
  },
};
</script>



