<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-template">
        <form @submit.prevent="signup">
          <h1>Sign up</h1>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              required
              v-model="email"
              type="email"
              id="email"
              placeholder="Snoopy"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              required
              v-model="username"
              type="text"
              id="username"
              placeholder="Snoopy"
              class="form-control form-control-lg"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              required
              v-model="password"
              type="password"
              id="password"
              placeholder="Password"
              class="form-control form-control-lg"
            />
          </div>
          <hr />
          <error v-if="error" v-bind:error="error" />
          <button
            type="submit"
            value="submit"
            class="btn btn-dark btn-lg btn-block"
          >
            signup
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../../gateways/auth";
import error from "../../components/error/error";

export default {
  components: { error },
  data: function () {
    return {
      email: "",
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signup: function () {
      const { email, username, password } = this;
      auth
        .signup({ email, username, password })
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((err) => {
          this.error = err;
        });
      console.log("called signup method");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>


