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
              <h2><button @click="logout">Logout</button></h2>
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
              <button class="button">
                <img src="https://cdn4.iconfinder.com/data/icons/files-13/100/circle-things-12-32.png">
                <strong class="button-text">New</strong>
              </button>
            </td>
            <td>
              <button class="button">
                <img src="https://cdn4.iconfinder.com/data/icons/files-13/100/circle-things-36-32.png">
                <strong class="button-text">Edit</strong>
              </button>
            </td>
            <td>
              <button class="button">
                <img src="https://cdn0.iconfinder.com/data/icons/ui-kit-elements/16/Share-32.png">
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
  import { ref, defineProps } from 'vue'
  import { authenticate, userSession } from '../services/auth.ts'

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

  // const login = () => {
  //   authenticate();
  // };

  // defineProps({
  //   greeting: String
  // });
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
