<template>
  <div>
    <commentPreview
      v-for="comment of comments"
      v-bind:comment="comment"
      :key="comment.id"
    />
  </div>
</template>
<script>
import commentPreview from "../comment/commentPreview";
import uApi from "../../gateways/user";

export default {
  name: "user-comments",
  components: { commentPreview },
  data: function () {
    return {
      comments: [],
    };
  },

  methods: {
    getAllCommentsOfUser: function () {
      console.log(`in get all comments`);
      const user_id = this.$route.params.user_id;
      uApi
        .getAllCommentsOfUser(user_id)
        .then((res) => {
          //reset comments
          this.comments.splice(0, this.comments.length);

          res.data.forEach((comment) => {
            this.comments.unshift(comment);
          });
          console.log(res);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    },
  },
  created: function () {
    console.log("userComments created called");
    this.getAllCommentsOfUser();
  },
};
</script>