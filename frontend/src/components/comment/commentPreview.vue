<template>
  <div class="container">
    <h3>{{ comment }}</h3>
    <p>{{ comment.textContent }}</p>
    <div v-if="hasPermission === true">
      <button @click="redirectToEditComment">edit comment</button>
    </div>
    <button @click="redirectToCommentOwnerProfile">
      commented by: {{ user.username }}
    </button>
  </div>
</template>

<script>
import uApi from "../../gateways/user";

export default {
  name: "commentPreview",
  props: { comment: { type: Object, required: true } },
  data: function () {
    return {
      user: {},
    };
  },
  computed: {
    hasPermission: function () {
      return (
        this.$store.getters.getUserId === this.comment.UserId ||
        this.$store.getters.isAdmin
      );
    },
  },
  methods: {
    getUser: function () {
      const user_id = this.comment.UserId;
      uApi
        .getUserInfos(user_id)
        .then((user) => {
          this.user = user;
        })
        .catch((error) => {
          this.user = null;
          console.log(`${error}`);
        });
    },
    redirectToCommentOwnerProfile: function () {
      this.$router.push(`/account/${this.user.id}`);
    },
    redirectToEditComment: function () {
      const url = this.comment.id;
      //need to pass :comment_id as params because params are ignored if a path is specified
      const pId = this.comment.PostId;
      this.$router.push({
        name: "EditComment",
        params: { postId: pId, comment_id: url },
      });
    },
  },
  created: function () {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 5px solid red;
}
</style>