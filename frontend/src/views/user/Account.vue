<template>
  <div class="vue-template">
    <div class="container rounded my-1 py-1">
      <div
        class="btn-group btn-group-md btn-group-toggle d-flex flex-wrap"
        data-toggle="buttons"
      >
        <label
          class="btn btn-outline-dark rounded-0"
          v-for="tab in tabs"
          v-bind:key="tab"
          v-on:click="currentTab = tab"
        >
          <input class="" type="radio" :data-name="tab" :data-id="tab" />
          {{ tab }}
        </label>
      </div>
      <component v-bind:is="currentTabComponent" :key="user.id"></component>
    </div>
  </div>
</template>
<script>
import displayAccount from "../../components/user/displayAccount";
import editAccount from "../../components/user/editAccount";
import userPosts from "../../components/user/userPosts";
import userComments from "../../components/user/userComments";
import store from "../../store/index";
import uApi from "../../gateways/user";

export default {
  components: {
    "display-account": displayAccount,
    "edit-account": editAccount,
    "user-posts": userPosts,
    "user-comments": userComments,
  },
  name: "account",
  data: function () {
    return {
      user: {},
      message: "edit account",
      currentTab: "display-account",
      tabs: [],
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase();
    },
  },
  methods: {
    setTabs: function () {
      //check if user is admin or if user in store is same as the route params
      console.log(`in set tabs`);
      const isAdmin = store.getters.isAdmin;
      const isUser = store.getters.getUserId == this.$route.params.user_id;
      //if it s true set tabs to both else set tabs to only display-account
      this.tabs = [];
      if (isAdmin || isUser) {
        this.tabs = [
          "display-account",
          "edit-account",
          "user-posts",
          "user-comments",
        ];
      } else {
        this.tabs = ["display-account", "user-posts", "user-comments"];
      }
    },
  },
  watch: {
    "$route.params.user_id"() {
      //check if user_id is valid
      const user_id = this.$route.params.user_id;
      uApi
        .getUserInfos(user_id)
        .then((user) => {
          console.log(`account found`);
          this.user = user;
          this.setTabs();
        })
        .catch((error) => {
          console.log(`account not found: ${error}`);
        });
    },
  },
  created: function () {
    this.setTabs();
  },
};
</script>