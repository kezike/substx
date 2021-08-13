import { createStore } from "vuex";
 
const store = createStore({
  state: {
    user: {
      // contains additional properties
      // from Stacks authentication
      username: ''
    },
    content: { id: '', data: '' },
  },

  getters: {
    username(state) {
      return state.user.username;
    },

    content(state) {
      return state.content.data;
    },
  },

  mutations: {
    saveContent(state, payload) {
      state.content.data = payload;
    },
  },

  actions: {}
});

export default store;
