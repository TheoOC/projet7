<template>
  <div>
    <div class="container rounded my-1 pt-3 pb-2">
      <div class="column">
        <div class="row">
          <button
            class="btn btn-light btn-text-custom mt-2 mb-4"
            @click="redirectToPostOwnerProfile"
          >
            posted by: {{ user.username }}
          </button>
          <div v-if="hasPermission === true">
            <button
              class="btn btn-light btn-text-custom mt-2 mb-4"
              @click="redirectToEditPost"
            >
              edit post
            </button>
          </div>
        </div>
        <h3 class="text-center">{{ post.title }}</h3>
        <p>{{ post.textContent }}</p>
        <div>
          <img
            class="img-fluid mx-auto"
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :alt="imageName"
          />
        </div>
      </div>
    </div>
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
      imageName: "",
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
          Vue.set(this, "post", post);
          const user_id = post.UserId;
          if (post.imageUrl) {
            this.imageName = post.imageUrl.split("/images/")[1];
          }
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
    "$route.params.post_id"() {
      this.getPostInfos();
      this.getAllComments();
    },
  },
  created: function () {
    this.getPostInfos();
    this.getAllComments();
  },
};
</script>