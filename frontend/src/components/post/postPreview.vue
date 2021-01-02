<template>
  <div class="container">
    <button @click="redirectToPost">go to post {{ post.id }}</button>
    <button @click="redirectToPostOwnerProfile">posted by: {{user.username}} </button>
    <h3>Title: {{ post.title }}</h3>
    <p>content: {{ post.textContent }}</p>
    <p>{{ post.imageUrl }}</p>
    <img :src="post.imageUrl" />
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
.container {
  border: 5px solid red;
}
</style>