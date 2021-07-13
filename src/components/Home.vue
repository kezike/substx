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
              <h2>Hi {{ username }}</h2>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button @click="logout"><strong>Logout</strong></button>
            </td>
          </tr>
        </tbody>
      </table>

      <table cellpadding="10">
        <thead>
          <tr>
            <th><img src="https://cdn0.iconfinder.com/data/icons/octicons/1024/book-4096.png" style="height: 64px;"></th>
            <th><h2><strong>Content</strong></h2></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button class="button" @click="$router.push('/content/new')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <strong class="button-text">New</strong>
              </button>
            </td>
            <td>
              <button class="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                <strong class="button-text">Edit</strong>
              </button>
            </td>
            <td>
              <button class="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                </svg>
                <strong class="button-text">Share</strong>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
    
  </div>
  <div v-if="!loggedIn">
    <img alt="SubStx logo" src="../assets/logo.png" />
    <h1>{{ greeting }}</h1>
    <button @click="login">Get Started</button>
  </div><br>
</template>

<script>
  import { ref, defineProps } from 'vue';
  import { authenticate, userSession } from '../services/auth';

  export default {
    name: 'Home',
    props: ['greeting'],
    
    data() {
      return {
        userSession,
      };
    },

    methods: {
      login() {
        authenticate();
      },

      logout() {
        userSession.signUserOut();
      }
    },

    computed: {
      loggedIn() {
        return userSession.isUserSignedIn();
      },

      username() {
        let uname;
        const unameCutoff = 15;
        const sessionData = userSession.store.getSessionData();
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

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
