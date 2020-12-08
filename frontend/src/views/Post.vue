<template>
  <div>
    <h2>Title: {{ post.title }}</h2>
    <p>Content: {{ post.textContent }}</p>
    <p>post id: {{ this.$route.params.post_id }}</p>
  </div>
</template>

<script>
import Vue from "vue";
import pApi from "../gateways/post";

export default {
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