<template>
  <div>
    <h2>Title: {{ post.title }}</h2>
    <p>Content: {{ post.textContent }}</p>
    <p>post id: {{ this.$route.params.post_id }}</p>
    <createComment v-on:get-all-comments="getAllComments" />
    <commentPreview
      v-for="comment in comments"
      v-bind:comment="comment"
      :key="comment.id"
    />
  </div>
</template>

<script>
import Vue from "vue";
import pApi from "../gateways/post";
import createComment from "../components/createComment";
import commentPreview from "../components/commentPreview";

export default {
  name: "Post",
  components: { createComment, commentPreview },
  data: function () {
    return {
      post: {},
      comments: [],
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
    getAllComments: function () {
      console.log(`post id: ${this.$route.params.post_id}`);
      const post_id = parseInt(this.$route.params.post_id);
      pApi
        .getAllCommentsOfPost(post_id)
        .then((res) => {
          this.comments.splice(0, this.comments.length);

          res.data.forEach((comment) => {
            this.comments.unshift(comment);
          });
        })
        .catch((error) => {
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
    this.getAllComments();
    //get all comments of post
  },
};
</script>