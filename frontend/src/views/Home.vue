<template>
  <div class="home">
    <CreatePost />
    <Post
      v-for="post in posts"
      :title="post.title"
      :textContent="post.textContent"
      :key="post.id"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from "../components/createPost.vue";
import Post from "../components/Post";
import pApi from "../gateways/post";
export default {
  name: "Home",
  components: {
    Post,
    CreatePost,
  },
  data: function () {
    return {
      posts: [],
    };
  },
  methods: {},
  computed: {},
  beforeCreate: function () {
    pApi
      .getAllPosts()
      .then((res) => {
        console.log("beforeCreate called");
        res.data.forEach((post) => {
          this.posts.unshift(post);
        });
        console.log(res);
      })
      .catch(() => {});
  },
};
</script>
