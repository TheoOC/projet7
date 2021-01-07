<template>
  <div class="container rounded">
    <div v-if="postsEmpty">
      <div class="nothing-here">
        <h3 class="text-center">... there is nothing here ...</h3>
      </div>
    </div>
    <postPreview v-for="post of posts" v-bind:post="post" :key="post.id" />
  </div>
</template>
<script>
import postPreview from "../post/postPreview";
import uApi from "../../gateways/user";

export default {
  name: "user-posts",
  components: { postPreview },
  data: function () {
    return {
      posts: [],
    };
  },
  methods: {
    getAllPostsOfUser: function () {
      const user_id = this.$route.params.user_id;
      uApi
        .getAllPostsOfUser(user_id)
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
  computed: {
    postsEmpty() {
      return this.posts === undefined || this.posts.length == 0;
    },
  },
  created: function () {
    this.getAllPostsOfUser();
  },
};
</script>