<template>
  <h2>Config</h2>
  <div>
    <tabs>
      <tab name="Objects">
        <h3><b>Headers</b></h3>
        <button @click="addHeader1()"><h1>Add Header 1</h1></button>
        <button @click="addHeader2()"><h2>Add Header 2</h2></button>
        <button @click="addHeader3()"><h3>Add Header 3</h3></button>
        <button @click="addHeader4()"><h4>Add Header 4</h4></button>
        <button @click="addHeader5()"><h5>Add Header 5</h5></button>
        <button @click="addHeader6()"><h6>Add Header 6</h6></button>
        <h3><b>Paragraphs</b></h3>
        <button @click="addParagraph()">Add Paragraph</button>
        <h3><b>Lists</b></h3>
        <button @click="addBulletList()">Add Bullet List</button>
        <button @click="addNumberList()">Add Number List</button>
      </tab>
      <tab name="Code">
        <textarea name="new-content-config" id="" cols="60" rows="30" v-model="content"></textarea>
      </tab>
    </tabs>
  </div>
</template>

<script>
  import { fetchContent } from '../services/stacks';
  import * as cheerio from 'cheerio';

  export default {
    name: 'ContentConfig',

    async mounted() {
      const contentId = this.$route.params.id;
      const content = (await fetchContent(contentId)).content;
      this.content = content;
      // We insert a temporary value into content if it is empty in order to
      // satisfy the cheerio.load method, which expects a truthy input value
      this.dom = cheerio.load(content || '<div>My Temp Div</div>');
      this.dom('div').remove();
    },

    data() {
      return {
        content: '',
        dom: null,
      };
    },

    methods: {
      addNode(defaultText, id=null) {
        if (id) {
          this.dom(`#${id}`).after(defaultText);
        } else {
          this.dom('body').append(defaultText);
        }
        this.content = this.dom.html();
      },

      addHeader1(id=null) {
        this.addNode('<h1>My Header 1</h1>', id);
      },

      addHeader2(id=null) {
        this.addNode('<h2>My Header 2</h2>', id);
      },

      addHeader3(id=null) {
        this.addNode('<h3>My Header 3</h3>', id);
      },

      addHeader4(id=null) {
        this.addNode('<h4>My Header 4</h4>', id);
      },

      addHeader5(id=null) {
        this.addNode('<h5>My Header 5</h5>', id);
      },

      addHeader6(id=null) {
        this.addNode('<h6>My Header 6</h6>', id);
      },

      addParagraph(id=null) {
        this.addNode('<p>My Paragraph</p>', id);
      },

      addBulletList(id=null) {
        const defaultBulletList = `
          <ul>
            <li>My Bullet Item 1</li>
            <li>My Bullet Item 2</li>
            <li>My Bullet Item 3</li>
          </ul>`;
        this.addNode(defaultBulletList, id);
      },

      addNumberList(id=null) {
        const defaultNumberList = `
          <ol>
            <li>My Number Item 1</li>
            <li>My Number Item 2</li>
            <li>My Number Item 3</li>
          </ol>`;
        this.addNode(defaultNumberList, id);
      },
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
