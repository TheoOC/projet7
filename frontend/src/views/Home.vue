<template>
  <div class="home">
    <createPost v-on:get-all-posts="setAllPosts" />
    <postPreview v-for="post in posts" v-bind:post="post" :key="post.id" />
  </div>
</template>

<script>
// @ is an alias to /src
import createPost from "../components/createPost.vue";
import postPreview from "../components/postPreview";
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
    setAllPosts: function () {
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
    this.setAllPosts();
  },
};
</script>
