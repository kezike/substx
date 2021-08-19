<template>
  <div v-if="loggedIn">
    <center>
      <table>
        <tbody>
          <tr>
            <td>
              <img alt="SubStx logo" src="../assets/logo-small.png" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <h1>Hi {{ username }}</h1>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button @click="logout"><strong>Logout</strong></button>
            </td>
          </tr>
        </tbody>
      </table><br>
      <div v-if="isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
        </svg>
        <strong style="font-size: 22px;">&nbsp;&nbsp;Content</strong><br><br>
        <div class="empty-table">
          <br>
          <p>Loading...</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
        </div>
      </div>
      <div v-if="!isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
          <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
          <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
        </svg>
        <strong style="font-size: 22px;">&nbsp;&nbsp;Content</strong><br><br>
        <button class="button create-content" @click="createContent()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
          </svg>
          <span style="font-size: 16px;">&nbsp;&nbsp;Create&nbsp;&nbsp;</span>
        </button>&nbsp;&nbsp;
        <button class="button clear-content" @click="clearContent()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
          <span style="font-size: 16px;">&nbsp;&nbsp;Clear&nbsp;&nbsp;</span>
        </button><br><br>
        <table cellpadding="10" v-if="hasContent">
          <thead align="center">
            <tr>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in content" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.date }}</td>
              <td>
                <button class="button" @click="viewContent(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                  <strong>&nbsp;&nbsp;View</strong>
                </button>
              </td>
              <td>
                <button class="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                  </svg>
                  <strong>&nbsp;&nbsp;Share</strong>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!hasContent">
          <div class="empty-table">
            <br>
            <p>No stored content available</p>
            <button class="button create-content-lone" @click="createContent()">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </center>
  </div>
  <div v-if="!loggedIn">
    <img alt="SubStx logo" src="../assets/logo.png" />
    <h1>{{ greeting }}</h1>
    <button @click="login">Get Started</button>
  </div><br>
</template>

<script>
  import {
    login,
    logout,
    loggedIn,
    getSessionData,
    hasContent,
    listContent,
    clearContent,
    processQuery,
  } from '../services/stacks';

  export default {
    name: 'Home',
    props: ['greeting'],
    
    data() {
      return {
        isLoading: true,
        hasContent: false,
        content: [],
      };
    },

    async mounted() {
      await this.updateContent();
    },

    methods: {
      login() {
        login();
      },

      logout() {
        logout();
      },

      async createContent() {
        this.$router.push('/content/new');
      },

      async viewContent(id) {
        this.$router.push(`/content/${id}`);
      },

      async updateContent() {
        this.isLoading = true;
        const hasCont = await hasContent();
        this.hasContent = hasCont;
        if (hasCont) {
          const query = {
            type: 'ORDER_BY',
            field: 'date',
            direction: -1,
          };
          console.log("this.content:", this.content);
          await listContent(this.content);
          console.log("this.content:", this.content);
          processQuery(this.content, query);
        }
        this.isLoading = false;
      },

      async clearContent() {
        await clearContent(this.content);
        await this.updateContent();
      }
    },

    computed: {
      loggedIn() {
        return loggedIn();
      },

      username() {
        let uname;
        const unameCutoff = 15;
        const sessionData = getSessionData();
        if (sessionData?.userData?.username) {
          uname = sessionData.userData.username;
        } else if (sessionData?.userData?.email) {
          uname = sessionData.userData.email;
        } else if (sessionData?.userData?.profile?.stxAddress?.testnet) {
          uname = sessionData.userData.profile.stxAddress.testnet;
        } else if (sessionData?.userData?.decentralizedID) {
          uname = sessionData.userData.decentralizedID;
        }
        if (uname) {
          const unameLen = Math.min(uname.length, unameCutoff);
          const unameBase = uname.substring(0, unameLen);
          if (uname.length > unameCutoff) {
            return `${unameBase}...`;
          }
          return unameBase;
        }
        return "friend";
      }
    }
  }
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  .button { width: 100px; }

  .button .button-text { font-size: 18px; }

  .create-content-lone { width: 50px; }

  .create-content .clear-content { width: 100px; }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }

  .empty-table {
    border-style: solid;
    border-width: 1px;
    height: 200px;
    width: 300px;
  }
</style>
