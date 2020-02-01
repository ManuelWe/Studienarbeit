import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/produkte',
    name: 'products',
    component: Products,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
