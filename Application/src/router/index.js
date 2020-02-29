import Vue from 'vue';
import VueRouter from 'vue-router';

const LandingPage = () => import('../views/LandingPage.vue');
const Dashboard = () => import('../views/Dashboard.vue');
const Products = () => import('../views/Products.vue');
const Product = () => import('../views/Product.vue');
const Kreuztabelle = () => import('../views/Kreuztabelle.vue');
const Default404 = () => import('../views/Default404.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'landingPage',
    components: {
      landingPage: LandingPage,
    },
  },
  {
    path: '/dashboard',
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
    beforeEnter(from, to, next) {
      console.log('here');
      next();
    },
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
