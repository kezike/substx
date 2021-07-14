<template>
  <h2>Preview</h2>
  <div class="preview">
    <span v-html="content"></span>
  </div>
</template>

<script>
  export default {
    name: 'ContentPreview',
    props: ['content']
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
  
  .preview {
    border-style: solid;
    border-width: 2px;
    height: 450px;
    width: 450px;
  }
</style>
