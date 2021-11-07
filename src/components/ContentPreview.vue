<template>
  <h2>Preview</h2>
  <div class="preview" @click.prevent='configureNode'>
    <span v-html="content"></span>
  </div>
  <ContentModal
      v-show="isModalVisible"
      @close="closeModal" />
</template>

<script>
  import ContentModal from './ContentModal.vue';

  export default {
    name: 'ContentPreview',

    components: {
      ContentModal
    },

    props: ['content'],

    data() {
      return {
        isModalVisible: false,
      };
    },

    methods: {
      configureNode(event) {
        if (event.target.className === 'content-node') {
          this.showModal();
        }
      },

      editNode(event) {
        this.dom(`#${event.target.id}`).remove();
      },

      showModal() {
        this.isModalVisible = true;
      },

      closeModal() {
        this.isModalVisible = false;
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

  .preview {
    border-style: solid;
    border-width: 2px;
    min-height: 450px;
    min-width: 450px;
  }
</style>
