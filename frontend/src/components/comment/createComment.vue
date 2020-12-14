<template>
  <div>
    <form class="" @submit.prevent="createComment" method="POST">
      <label for="textContent">Text</label>
      <textarea
        required
        v-model="textContent"
        id="text"
        name="text"
        placeholder="write a comment text"
      ></textarea>

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
<script>
import cApi from "../../gateways/comment";

export default {
  data: function () {
    return {
      textContent: "",
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
          console.log("successfully called createComment");
          this.$emit("get-all-comments");
        })
        .catch((error) => {
          console.log(`failed to call createComment: ${error}`);
        });
    },
  },
};
</script>