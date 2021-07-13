import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Content from '../components/Content.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/About.vue')
  },
  {
    path: '/content/new',
    name: 'Content',
    component: () => import('../components/Content.vue')
  },
  // {
  //   path: '/content/:id',
  //   name: 'ViewContent',
  //   component: Home
  // },
  // {
  //   path: '/content/:id/edit',
  //   name: 'EditContent',
  //   component: Home
  // },
  // {
  //   path: '/content/:id/share',
  //   name: 'ShareContent',
  //   component: Home
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
