<template>
  <div>
    <button v-for="tab in tabs" v-bind:key="tab" v-on:click="currentTab = tab">
      {{ tab }}
    </button>
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>
<script>
import displayAccount from "../../components/user/displayAccount";
import editAccount from "../../components/user/editAccount";
import store from "../../store/index";

export default {
  components: {
    "display-account": displayAccount,
    "edit-account": editAccount,
  },
  name: "account",
  data: function () {
    return {
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
      const isAdmin = store.getters.isAdmin;
      const isUser = store.getters.getUserId == this.$route.params.user_id;
      //if it s true set tabs to both else set tabs to only display-account
      if (isAdmin || isUser) {
        this.tabs = ["display-account", "edit-account"];
      } else {
        this.tabs = ["display-account"];
      }
    },
  },
  created: function () {
    this.setTabs();
  },
};
</script>