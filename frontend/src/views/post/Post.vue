<template>
  <div>
    <h2>Title: {{ post.title }}</h2>
    <p>Content: {{ post.textContent }}</p>
    <p>post id: {{ this.$route.params.post_id }}</p>
    <p>{{ post }}</p>
    <div v-if="hasPermission === true">
      <button @click="redirectToEditPost">edit post</button>
    </div>
    <button @click="redirectToPostOwnerProfile">
      posted by: {{ user.username }}
    </button>
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
import store from "../../store/index";
import pApi from "../../gateways/post";
import uApi from "../../gateways/user";
import createComment from "../../components/comment/createComment";
import commentPreview from "../../components/comment/commentPreview";

export default {
  name: "Post",
  components: { createComment, commentPreview },
  data: function () {
    return {
      user: {},
      post: {},
      comments: [],
    };
  },
  computed: {
    hasPermission: function () {
      console.log(`
      can user edit post: is store userid same as post userid -> ${
        store.getters.getUserId === this.post.UserId
      }
      is user admin -> ${store.getters.isAdmin} 
      return from has permission-> ${
        store.getters.getUserId === this.post.UserId || store.getters.isAdmin
      }
      `);
      return (
        store.getters.getUserId === this.post.UserId || store.getters.isAdmin
      );
    },
  },
  methods: {
    redirectToPostOwnerProfile: function () {
      this.$router.push(`/account/${this.user.id}`);
    },
    getPostInfos: function () {
      //get post and user who made the post
      pApi
        .getPost(this.$route.params.post_id)
        .then((post) => {
          console.log(`POST IN DATA SET !!!!!!!!`);
          Vue.set(this, "post", post);
          const user_id = post.UserId;
          uApi
            .getUserInfos(user_id)
            .then((user) => {
              this.user = user;
            })
            .catch((error) => {
              this.user = null;
              console.log(`${error}`);
            });
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
    redirectToEditPost: function () {
      this.$router.push(`/post/${this.post.id}/edit`);
    },
  },
  watch: {
    //watch for post id changes in url
    $route() {
      //get post from api
      this.getPost();
    },
  },
  created: function () {
    this.getPostInfos();
    this.getAllComments();
  },
};
</script>