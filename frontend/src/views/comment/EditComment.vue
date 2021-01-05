<template>
  <div class="container">
    <form @submit.prevent="editComment" method="PUT">
      <div class="form-group">
        <label for="textContent">Text</label>
        <textarea
          required
          v-model="textContent"
          id="textContent"
          name="text"
          placeholder="write some text"
          class="form-control"
        ></textarea>
      </div>
      <error v-if="error" v-bind:error="error" />
      <button class="btn btn-primary" type="submit">submit</button>
    </form>
    <button class="btn" @click="deleteComment">delete comment</button>
    <button class="btn" @click="backToPost">
      go back to post {{ postId }}
    </button>
  </div>
</template>

<script>
import cApi from "../../gateways/comment";
import error from "../../components/error/error";

export default {
  name: "EditComment",
  components: { error },
  data: function () {
    return {
      textContent: "",
      error: "",
      postId: "",
    };
  },
  methods: {
    backToPost() {
      const post_id = this.postId;
      this.$router.push(`/post/${post_id}`);
    },
    setDefaultInputValues: function () {
      const comment_id = this.$route.params.comment_id;
      cApi
        .getComment(comment_id)
        .then((comment) => {
          this.postId = comment.PostId;
          this.textContent = comment.textContent;
          document.getElementById(
            "textContent"
          ).defaultValue = this.textContent;
          console.log(`setDefaultInputValues successfull`);
        })
        .catch((error) => {
          this.textContent = "";
          console.log(
            `there was an error getting the comment from the api: ${error}`
          );
        });
    },
    editComment: function () {
      const comment_id = this.$route.params.comment_id;
      const { textContent } = this;
      const comment = { textContent };
      cApi
        .updateComment(comment, comment_id)
        .then(() => {
          this.error = "";
          console.log(`successfully called updateComment`);
          this.$router.push(`/post/${this.postId}`);
        })
        .catch((err) => {
          console.log(`error trying to update the comment: ${err}`);
          this.error = err;
        });
    },
    deleteComment: function () {
      const comment_id = this.$route.params.comment_id;
      cApi
        .deleteComment(comment_id)
        .then(() => {
          console.log(`successfully called deleteComment`);
          this.$router.push(`/post/${this.postId}`);
        })
        .catch((err) => {
          console.log(`failed to call deleteComment: ${err}`);
        });
    },
  },
  created: function () {
    this.setDefaultInputValues();
  },
};
</script>