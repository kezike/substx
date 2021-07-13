import { createStore } from "vuex";
 
const store = createStore({
  state: {
    user: {
      // contains additional properties
      // from Stacks authentication
      username: ''
    },
    content: ''
  },

  getters: {
    username(state) {
      return state.user.username;
    },

    content(state) {
      return state.content;
    },
  },

  mutations: {
    saveContent(state, payload) {
      state.content = payload;
    }
  },

  actions: {}
});

export default store;
