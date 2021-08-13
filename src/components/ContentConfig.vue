<template>
  <h2>Config</h2>
  <textarea name="new-content-config" id="" cols="60" rows="30" v-model="content"></textarea>
</template>

<script>
  import { fetchContent } from '../services/stacks';

  export default {
    name: 'ContentConfig',

    async mounted() {
      const contentId = this.$route.params.id;
      const content = (await fetchContent(contentId)).content;
      this.content = content;
    },

    data() {
      return {
        content: ''
      };
    },

    watch: {
      content(newContent) {
        this.$store.commit("saveContent", newContent);
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
