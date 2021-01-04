<template>
  <div class="vue-template">
    <form @submit.prevent="login">
      <h1>Login</h1>
      <template v-if="loginType === 'email'">
        <div class="form-group">
          <label>email</label>
          <input
            required
            v-model="email"
            type="email"
            placeholder="Snoopy"
            key="email-input"
            class="form-control form-control-lg"
          />
        </div>
      </template>

      <template v-else>
        <div class="form-group">
          <label>Username</label>
          <input
            required
            v-model="username"
            type="text"
            placeholder="Snoopy"
            key="username-input"
            class="form-control form-control-lg"
          />
        </div>
      </template>

      <div class="form-group">
        <label>Password</label>
        <input
          required
          v-model="password"
          type="password"
          placeholder="Password"
          class="form-control form-control-lg"
        />
      </div>
      <hr />
      <button
        type="submit"
        value="submit"
        class="btn btn-dark btn-lg btn-block"
      >
        Login
      </button>
      <button
        @click="changeLoginType"
        class="btn btn-light change-login-type text-right mt-2 mb-4"
      >
        {{ message }}
      </button>
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
      const { email, username, password } = this;
      const user = { email, username, password };
      this.$store
        .dispatch("AUTH_REQUEST", user)
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>


