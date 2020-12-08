<template>
  <div>
    <form class="" @submit.prevent="createPost" method="POST">
      <label for="title">Title</label>
      <input
        required
        v-model="title"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
      />

      <label for="textContent">Text</label>
      <textarea
        required
        v-model="textContent"
        id="text"
        name="text"
        placeholder="write some text"
      ></textarea>

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import Post from "../gateways/post";
import store from "../store/index";

export default {
  data: function () {
    return {
      title: "",
      textContent: "",
    };
  },
  methods: {
    createPost: function () {
      const { title, textContent } = this;
      const userId = store.getters.getUserId;
      const post = { title, textContent, userId };
      console.log(JSON.stringify(post));
      Post.createPost(post)
        .then(() => {
          console.log("successfully called create Post");
          this.$emit("get-all-posts");
        })
        .catch((error) => {
          console.log(`failed to call create post: ${error}`);
        });

      //update parent component (Home.vue)
    },
  },
};
</script>