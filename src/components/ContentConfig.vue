<template>
  <h2>Config</h2>
  <div>
    <tabs>
      <tab name="Elements">
        <h3><b>Headers</b></h3>
        <button @click="addHeader1()"><h1>Add Header 1</h1></button><br>
        <button @click="addHeader2()"><h2>Add Header 2</h2></button><br>
        <button @click="addHeader3()"><h3>Add Header 3</h3></button><br>
        <button @click="addHeader4()"><h4>Add Header 4</h4></button><br>
        <button @click="addHeader5()"><h5>Add Header 5</h5></button><br>
        <button @click="addHeader6()"><h6>Add Header 6</h6></button><br>
        <h3><b>Paragraphs</b></h3>
        <button @click="addParagraph()">Add Paragraph</button>
        <h3><b>Lists</b></h3>
        <button @click="addBulletList()">Add Bullet List</button>
        <button @click="addNumberList()">Add Number List</button>
        <h3><b>Images</b></h3>
        <button @click="addImage()">Add Image</button>
      </tab>
      <tab name="Code">
        <textarea name="new-content-config" id="" cols="60" rows="30" v-model="content"></textarea>
      </tab>
    </tabs>
  </div>
</template>

<script>
  import { fetchContent } from '../services/stacks';
  import { html as beautify } from 'js-beautify';
  import { v4 as uuidv4 } from 'uuid';
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
      this.setupStyleBlock();
    },

    data() {
      return {
        content: '',
        dom: null,
        defaultOpts: {
          id: null,
          direction: 1
        }
      };
    },

    methods: {
      beautify(domHtml) {
        return beautify(domHtml, { indent_inner_html: true, indent_size: 2 });
      },

      setupStyleBlock() {
        const styleBlock = `
          <style>
            .content-node:hover {
              color: lightgray;
              cursor: pointer;
            }
          </style>`;
        this.dom('head').append(styleBlock);
      },

      addNode(defaultText, opts=this.defaultOpts) {
        const nodeId = uuidv4();
        const defaultNode = `
          <div>
            ${defaultText}
          </div>`;
        if (opts.sibId) {
          this.dom(`#${opts.sibId}`).after(defaultNode);
          const node = this.dom(`#${opts.sibId}`).next().children().first();
          node.attr('id', nodeId);
        } else {
          this.dom('body').append(defaultNode);
          const node = this.dom('body').children('div').last().children().first();
          node.attr('id', nodeId);
          node.addClass('content-node');
        }
        this.dom('.content-node:hover').css('background-color','red');
        this.content = this.beautify(this.dom.html());
      },

      addHeader1(opts=this.defaultOpts) {
        this.addNode('<h1>My Header 1</h1>', opts);
      },

      addHeader2(opts=this.defaultOpts) {
        this.addNode('<h2>My Header 2</h2>', opts);
      },

      addHeader3(opts=this.defaultOpts) {
        this.addNode('<h3>My Header 3</h3>', opts);
      },

      addHeader4(opts=this.defaultOpts) {
        this.addNode('<h4>My Header 4</h4>', opts);
      },

      addHeader5(opts=this.defaultOpts) {
        this.addNode('<h5>My Header 5</h5>', opts);
      },

      addHeader6(opts=this.defaultOpts) {
        this.addNode('<h6>My Header 6</h6>', opts);
      },

      addParagraph(opts=this.defaultOpts) {
        this.addNode('<p>My Paragraph</p>', opts);
      },

      addBulletList(opts=this.defaultOpts) {
        const defaultBulletList = `
          <ul>
            <li>My Bullet Item 1</li>
            <li>My Bullet Item 2</li>
            <li>My Bullet Item 3</li>
          </ul>`;
        this.addNode(defaultBulletList, opts);
      },

      addNumberList(opts=this.defaultOpts) {
        const defaultNumberList = `
          <ol>
            <li>My Number Item 1</li>
            <li>My Number Item 2</li>
            <li>My Number Item 3</li>
          </ol>`;
        this.addNode(defaultNumberList, opts);
      },

      addImage(opts=this.defaultOpts) {
        const defaultImage = '<img alt="My Image" src="https://picsum.photos/200" />';
        this.addNode(defaultImage, opts);
      }
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

  .control-node {
    position: fixed;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    width: 300px;
  }

  .active {
    background: green;
  }
</style>
