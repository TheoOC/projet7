<template>
  <div class="container">
    <form @submit.prevent="editPost" method="PUT">
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
        <label for="textContent">Text</label>
        <textarea
          required
          v-model="textContent"
          id="textContent"
          name="text"
          placeholder="write some text"
          class="form-control"
          rows="2"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="file-input">change image</label>
        <input
          type="file"
          accept="image/*"
          @change="uploadImage($event)"
          id="file-input"
        />
      </div>
      <div>
        <img class="img-fluid" v-if="imageUrl" :src="imageUrl" />
      </div>
      <error v-if="error" v-bind:error="error" />
      <button class="btn btn-primary" type="submit">submit</button>
    </form>
    <button type="button" class="btn" @click="deletePost">delete Post</button>
    <button type="button" class="btn" @click="backToPost">
      go back to post {{ postId }}
    </button>
  </div>
</template>

<script>
import pApi from "../../gateways/post";
import store from "../../store/index";
import error from "../../components/error/error";

export default {
  name: "EditPost",
  components: { error },
  data: function () {
    return {
      title: "",
      textContent: "",
      image: null,
      imageUrl: null,
      postId: "",
      postUserId: "",
      error: "",
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
          this.postUserId = post.UserId;
          document.getElementById("title").defaultValue = this.title;
          document.getElementById(
            "textContent"
          ).defaultValue = this.textContent;
          console.log(`setDefaultInputValues successfull`);
        })
        .catch((error) => {
          this.title = null;
          this.textContent = null;
          this.imageUrl = null;
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
          console.log(`error trying to update the post: ${err}`);
          this.error = err;
          //check if error 422 if error 422 show error else redirect to posts
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
    hasPermission: function () {
      if (
        !(
          this.postUserId == store.getters.getUserId ||
          store.getters.isAdmin == true
        )
      ) {
        console.log(`can edit post`);
      } else {
        console.log(`can't edit post`);
        this.$router.push(`/post/${this.postUserId}`);
      }
    },
  },
  watch: {
    "$route.params.post_id"() {
      this.hasPermission();
      this.setDefaultInputValues();
    },
  },
  created: function () {
    this.setDefaultInputValues();
  },
};
</script>