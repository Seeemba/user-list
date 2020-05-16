import Vue from 'vue';
import VueRouter from 'vue-router';

import NetworkIssue from '../views/NetworkIssue';
import NotFound from '../views/NotFound';
import UserList from "../components/UserList";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    props: true,
    component: UserList
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  next();
});

export default router;
