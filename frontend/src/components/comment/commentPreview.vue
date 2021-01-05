<template>
  <div class="container rounded border border-primary my-1">
    <div class="column">
      <div class="row">
        <button class="btn" @click="redirectToCommentOwnerProfile">
          comment by: {{ user.username }}
        </button>
        <div v-if="hasPermission === true">
          <button class="btn" @click="redirectToEditComment">
            edit comment
          </button>
        </div>
      </div>
      <p>{{ comment.textContent }}</p>
    </div>
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
      this.$router.push(`/comment/${this.comment.id}/edit`);
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