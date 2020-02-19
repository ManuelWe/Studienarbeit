import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Product from '../views/Product.vue';
import Kreuztabelle from '../views/Kreuztabelle.vue';
import Default404 from '../views/Default404.vue';

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
  {
    path: '/produkte/:ArtNr',
    name: 'product',
    component: Product,
  },
  {
    path: '/kreuztabelle',
    name: 'kreuztabelle',
    component: Kreuztabelle,
  },
  {
    path: '*',
    name: 'default',
    component: Default404,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
