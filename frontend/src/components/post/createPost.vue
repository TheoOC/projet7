<template>
  <div class="container">
    <form class="" @submit.prevent="createPost" method="POST">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          required
          v-model="title"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="text">Text</label>
        <textarea
          required
          v-model="textContent"
          id="text"
          name="text"
          placeholder="write some text"
          class="form-control"
          rows="2"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="file-input">add image</label>
        <input
          type="file"
          accept="image/*"
          @change="uploadImage($event)"
          id="file-input"
          ref="fileInput"
          class="form-control-file"
        />
      </div>
      <div class="form-group">
        <img v-if="imageUrl" class="img-fluid" :src="imageUrl" />
      </div>
      <error v-if="error" v-bind:error="error" />
      <button class="btn btn-primary" type="submit">submit</button>
      <button class="btn btn-danger" @click="clearInput">clear</button>
    </form>
  </div>
</template>

<script>
import Post from "../../gateways/post";
import store from "../../store/index";
import error from "../error/error";

export default {
  components: { error },
  data: function () {
    return {
      title: "",
      textContent: "",
      image: null,
      imageUrl: null,
      error: "",
    };
  },
  methods: {
    uploadImage(event) {
      //save image
      this.image = event.target.files[0];
      //use imageUrl as blob to preview image
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
    },
    clearInput() {
      this.title = null;
      this.textContent = null;
      this.image = null;
      this.imageUrl = null;
      this.error = ""
      this.$refs.fileInput.value = null;
    },
    createPost: function () {
      this.error = "";
      const { title, textContent } = this;
      const userId = store.getters.getUserId;
      const post = { title, textContent, userId };
      console.log(JSON.stringify(post));
      Post.createPost(post, this.image)
        .then(() => {
          this.clearInput();
          console.log("successfully called create Post");
          this.$emit("get-all-posts");
        })
        .catch((err) => {
          this.clearInput();
          this.error = err;
          console.log(`failed to call create post: ${err}`);
        });
    },
  },
};
</script>