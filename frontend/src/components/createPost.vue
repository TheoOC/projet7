<template>
  <div>
    <form class="" @submit.prevent="createPost">
      <label for="title">Title</label>
      <input required v-model="title" type="text" id="title" name="title" placeholder="Title" />

      <label for="textContent">Text</label>
      <textarea required v-model="textContent" id="text" name="text" placeholder="write some text"></textarea>

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "",
      textContent: "",
    };
  },
  methods: {
    createPost: function () {
        
    },
  },
};
</script>