import { createApp } from 'vue';
import { Tab, Tabs } from 'vue3-tabs-component';

import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .component('tab', Tab)
  .component('tabs', Tabs)
  .use(router)
  .use(store)
  .mount('#app');
