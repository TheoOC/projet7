<template>
  <div class="container rounded my-1 py-1">
    <div class="column">
      <div class="row">
        <button
          class="btn btn-light btn-text-custom text-right mt-2 mb-4"
          @click="redirectToPost"
        >
          go to post: {{ post.id }}
        </button>
        <button
          class="btn btn-light btn-text-custom text-right mt-2 mb-4"
          @click="redirectToPostOwnerProfile"
        >
          posted by: {{ user.username }}
        </button>
      </div>

      <h3 class="text-center">{{ post.title }}</h3>
      <p>{{ post.textContent }}</p>
      <img class="img-fluid mx-auto" :src="post.imageUrl" :alt="imageName" />
    </div>
  </div>
</template>

<script>
import uApi from "../../gateways/user";

export default {
  name: "postPreview",
  props: { post: { type: Object, required: true } },
  data: function () {
    return {
      user: {},
      imageName: "",
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
    if (this.post.imageUrl) {
      this.imageName = this.post.imageUrl.split("/images/")[1];
    }
  },
};
</script>

<style lang="scss" scoped>
</style>