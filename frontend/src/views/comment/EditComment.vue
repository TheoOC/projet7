<template>
  <div>
    <form @submit.prevent="editComment" method="PUT">
      <label for="textContent">Text</label>
      <textarea
        required
        v-model="textContent"
        id="textContent"
        name="text"
        placeholder="write some text"
      ></textarea>
      <h3>comment from post: {{ postId }} </h3>
      <input type="submit" value="Submit" />
    </form>
    <button @click="deleteComment">delete comment</button>
  </div>
</template>

<script>
import cApi from "../../gateways/comment";

export default {
  name: "EditComment",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      textContent: "",
    };
  },
  methods: {
    setDefaultInputValues: function () {
      const comment_id = this.$route.params.comment_id;
      cApi
        .getComment(comment_id)
        .then((comment) => {
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
          console.log(`successfully called updateComment`);
          this.$router.push(`/post/${this.postId}`);
        })
        .catch((err) => {
          console.log(`failed to call updateComment: ${err}`);
          this.$router.push(`/post/${this.postId}`);
        });
    },
    deleteComment: function () {
      const comment_id = this.$route.params.comment_id;
      cApi
        .deleteComment(comment_id)
        .then(() => {
          console.log(`successfully called deleteComment`);
          this.$router.push("/");
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