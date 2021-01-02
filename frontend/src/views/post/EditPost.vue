<template>
  <div>
    <form @submit.prevent="editPost" method="PUT">
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
        id="textContent"
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
    <button @click="deletePost">delete Post</button>
    <button @click="backToPost">go back to post {{ postId }}</button>
  </div>
</template>

<script>
import pApi from "../../gateways/post";

export default {
  name: "EditPost",
  data: function () {
    return {
      title: "",
      textContent: "",
      image: null,
      imageUrl: null,
      postId: "",
    };
  },
  methods: {
    backToPost() {
      this.$router.push(`/post/${this.postId}`);
    },
    uploadImage(event) {
      //save image
      this.image = event.target.files[0];
      //use imageUrl as blob to preview image
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
    },
    setDefaultInputValues: function () {
      const post_id = this.$route.params.post_id;
      pApi
        .getPost(post_id)
        .then((post) => {
          this.title = post.title;
          this.textContent = post.textContent;
          this.imageUrl = post.imageUrl;
          this.postId = post.id;
          document.getElementById("title").defaultValue = this.title;
          document.getElementById(
            "textContent"
          ).defaultValue = this.textContent;
          console.log(`setDefaultInputValues successfull`);
        })
        .catch((error) => {
          this.title = "";
          this.textContent = "";
          console.log(
            `there was an error getting the post from the api: ${error}`
          );
        });
    },
    editPost: function () {
      const { title, textContent } = this;
      const post = { title, textContent };
      pApi
        .updatePost(post, this.image, this.postId)
        .then(() => {
          console.log(`successfully called updatePost`);
          this.$router.push(`/post/${this.postId}`);
        })
        .catch((err) => {
          console.log(`failed to call updatePost: ${err}`);
          this.$router.push(`/post/${this.postId}`);
        });
    },
    deletePost: function () {
      pApi
        .deletePost(this.postId)
        .then(() => {
          console.log(`successfully called deletePost`);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(`failed to call deletePost: ${err}`);
        });
    },
  },
  mounted: function () {
    this.setDefaultInputValues();
  },
};
</script>