<template>
  <div class="container rounded border border-primary my-1">
    <div class="column">
      <div class="row">
      <button class="btn" @click="redirectToPost">go to post: {{ post.id }}</button>
      <button class="btn" @click="redirectToPostOwnerProfile">
        posted by: {{ user.username }}
      </button>
      </div>
      <h3>{{ post.title }}</h3>
      <p>{{ post.textContent }}</p>
      <img class="img-fluid" :src="post.imageUrl" />
    </div>
  </div>
</template>

//get user who made the post and add link to user account
<script>
import uApi from "../../gateways/user";

export default {
  name: "postPreview",
  props: { post: { type: Object, required: true } },
  data: function () {
    return {
      user: {},
    };
  },
  methods: {
    redirectToPost: function () {
      this.$router.push(`/post/${this.post.id}`);
    },
    redirectToPostOwnerProfile: function () {
      this.$router.push(`/account/${this.user.id}`);
    },
    getUser: function () {
      const user_id = this.post.UserId;
      uApi
        .getUserInfos(user_id)
        .then((user) => {
          this.user = user;
        })
        .catch((error) => {
          this.user = null;
          console.log(`${error}`);
        });
    },
  },
  created: function () {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
</style>