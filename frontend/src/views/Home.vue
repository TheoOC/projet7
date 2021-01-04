<template>
  <div class="vue-template">
    <createPost v-on:get-all-posts="getAllPosts" />
    <postPreview v-for="post in posts" v-bind:post="post" :key="post.id" />
  </div>
</template>

<script>
// @ is an alias to /src
import createPost from "../components/post/createPost.vue";
import postPreview from "../components/post/postPreview";
import pApi from "../gateways/post";
export default {
  name: "Home",
  components: {
    postPreview,
    createPost,
  },
  data: function () {
    return {
      posts: [],
    };
  },
  methods: {
    getAllPosts: function () {
      pApi
        .getAllPosts()
        .then((res) => {
          //reset posts
          this.posts.splice(0, this.posts.length);

          res.data.forEach((post) => {
            this.posts.unshift(post);
          });
          console.log(res);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    },
  },
  computed: {},
  created: function () {
    console.log("beforeCreate called");
    this.getAllPosts();
  },
};
</script>
