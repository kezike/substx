<template>
  <h2>Config</h2>
  <textarea name="new-content-config" id="" cols="60" rows="30" v-model="content"></textarea>
</template>

<script>
  export default {
    name: 'ContentConfig',
    // emits: ['updateHtml'],

    data() {
      return {
        content: ''
      };
    },
    // methods: {
    //   updateHtml() {
    //     const rawHtml = this.$refs.content.value;
    //     this.$emit('updateHtml', rawHtml);
    //   }
    // },
    watch: {
      content(newContent) {
        // console.log("new content:", newContent);
        // console.log("store", this.$store);
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
