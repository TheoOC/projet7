<template>
  <div>
    <h2>Title: {{ post.title }}</h2>
    <p>Content: {{ post.textContent }}</p>
    <p>post id: {{ this.$route.params.post_id }}</p>
    <createComment />
  </div>
</template>

<script>
import Vue from "vue";
import pApi from "../gateways/post";
import createComment from "../components/createComment";

export default {
  components: { createComment },
  name: "Post",
  data: function () {
    return {
      post: {},
    };
  },
  methods: {
    getPost: function () {
      pApi
        .getPost(this.$route.params.post_id)
        .then((post) => {
          Vue.set(this, "post", post);
        })
        .catch((error) => {
          this.post = null;
          console.log(`${error}`);
        });
    },
  },
  watch: {
    //watch for post id changes in url
    $route(to, from) {
      console.log(`to: ${to}`);
      console.log(`from: ${from}`);
      //get post from api
      this.getPost();
    },
  },
  created: function () {
    this.getPost();
    //get all comments of post
  },
};
</script>