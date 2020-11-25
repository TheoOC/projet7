<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>login</h1>

      <template v-if="loginType === 'username'">
        <label>email</label>
        <input
          required
          v-model="email"
          type="email"
          placeholder="Snoopy"
          key="email-input"
        />
      </template>

      <template v-else>
        <label>Username</label>
        <input
          required
          v-model="username"
          type="text"
          placeholder="Snoopy"
          key="username-input"
        />
      </template>

      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button @click="changeLoginType">{{ message }}</button>
      <button type="submit" value="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "connect with username",
      loginType: "email",
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    changeLoginType: function () {
      if (this.loginType == "email") {
        this.loginType = "username";
        this.message = "connect with email";
      } else {
        this.loginType = "email";
        this.message = "connect with username";
      }
    },
    login: function () {
      //const { username, password } = this;
      this.$store.dispatch("AUTH_REQUEST").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>


