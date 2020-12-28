<template>
  <div>
    <button v-for="tab in tabs" v-bind:key="tab" v-on:click="currentTab = tab">
      {{ tab }}
    </button>
    <component v-bind:is="currentTabComponent" v-bind:user="user"></component>
  </div>
</template>
<script>
import store from "../../store/index";
import uApi from "../../gateways/user";

import displayAccount from "../../components/user/displayAccount";
import editAccount from "../../components/user/editAccount";

export default {
  components: {
    "display-account": displayAccount,
    "edit-account": editAccount,
  },
  name: "account",
  data: function () {
    return {
      user: {},
      message: "edit account",
      currentTab: "display-account",
      tabs: ["display-account", "edit-account"],
    };
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase();
    },
  },
  created: function () {
    uApi
      .getUserInfos(store.getters.getUserId)
      .then((user) => {
        this.user = user;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  },
};
</script>