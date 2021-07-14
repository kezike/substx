<template>
  <h1>New Content</h1>
  <center>
    <table cellpadding="10">
      <tbody>
        <tr>
          <td>
            <button class="button" @click="cancel">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              <strong class="button-text">Cancel</strong>
            </button>
          </td>
          <td>
            <button class="button" @click="save">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
              </svg>
              <strong class="button-text">Save</strong>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
      
    <table cellpadding="50">
        <tbody>
          <tr>
            <td style="vertical-align: top;">
              <ContentConfig />
            </td>
            <td></td>
            <td style="vertical-align: top;">
              <ContentPreview :content="content" />
            </td>
          </tr>
        </tbody>
      </table>
  </center>
</template>

<script>
  import ContentConfig from './ContentConfig.vue';
  import ContentPreview from './ContentPreview.vue';
  import { persistContent } from '../services/stacks';

  export default {
    name: 'Content',
    components: {
      ContentConfig,
      ContentPreview
    },

    methods: {
      cancel() {
        this.$router.go(-1);
      },

      async save() {
        const content = this.$store.getters.content;
        const contentRecord = {
          id: 'my-id',
          date: 'my/da/te',
          title: 'My title',
          content
        };
        await persistContent(contentRecord);
        this.cancel();
      }
    },

    computed: {
      content() {
        const content = this.$store.getters.content;
        if (content) {
          return content;
        }
        return `
          <center>
            <br><br><br><br><br><br><br><br>
            <p><strong>No available content to render</strong></p>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-slash-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
            </svg>
          </center>`;
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
