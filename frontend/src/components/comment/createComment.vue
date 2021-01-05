<template>
  <div class="container">
    <form class="" @submit.prevent="createComment" method="POST">
      <div>
        <label for="textContent">Text</label>
        <textarea
          required
          v-model="textContent"
          id="text"
          name="text"
          placeholder="write a comment text"
          class="form-control"
          rows="2"
        ></textarea>
      </div>
      <error v-if="error" v-bind:error="error" />
      <button class="btn btn-primary" type="submit">submit</button>
    </form>
  </div>
</template>
<script>
import cApi from "../../gateways/comment";
import error from "../../components/error/error";

export default {
  components: { error },
  data: function () {
    return {
      textContent: "",
      error: "",
    };
  },
  methods: {
    createComment: function () {
      const { textContent } = this;
      const cData = {
        textContent: textContent,
        userId: this.$store.getters.getUserId,
        postId: this.$route.params.post_id,
      };
      cApi
        .createComment(cData)
        .then(() => {
          this.error = "";
          this.textContent = null;
          console.log("successfully called createComment");
          this.$emit("get-all-comments");
        })
        .catch((err) => {
          this.textContent = null;
          this.error = err;
          console.log(`failed to call createComment: ${err}`);
        });
    },
  },
};
</script>