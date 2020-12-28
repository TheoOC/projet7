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

      <input
        type="file"
        accept="image/*"
        @change="uploadImage($event)"
        id="file-input"
      />
      <div>
        <img v-if="imageUrl" :src="imageUrl" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import Post from "../../gateways/post";
import store from "../../store/index";

export default {
  data: function () {
    return {
      title: "",
      textContent: "",
      image: null,
      imageUrl: null,
    };
  },
  methods: {
    uploadImage(event) {
      //save image
      this.image = event.target.files[0];
      //use imageUrl as blob to preview image
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
    },

    createPost: function () {
      const { title, textContent } = this;
      const userId = store.getters.getUserId;
      const post = { title, textContent, userId };
      console.log(JSON.stringify(post));
      Post.createPost(post, this.image)
        .then(() => {
          console.log("successfully called create Post");
          this.$emit("get-all-posts");
        })
        .catch((error) => {
          console.log(`failed to call create post: ${error}`);
        });
    },
  },
};
</script>