<template>
  <div class="home">
    <createPost />
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
  methods: {},
  computed: {},
  beforeCreate: function () {
    console.log("beforeCreate called");
    pApi
      .getAllPosts()
      .then((res) => {
        res.data.forEach((post) => {
          this.posts.unshift(post);
        });
        console.log(res);
      })
      .catch(() => {});
  },
};
</script>
