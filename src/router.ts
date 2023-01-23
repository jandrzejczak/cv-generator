import { createWebHistory, createRouter } from 'vue-router';
import CreateView from './views/CreateView.vue';
import SavedView from './views/SavedLayoutsView.vue'
import AccountView from './views/AccountView.vue';
import HomePage from './views/HomePage.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import store from './store/store';

const routes = [
  {
    path: '/',
    component: HomePage,
    redirect: '/about',
    children: [
      {
        path: '/create',
        name: 'CreateView',
        component: CreateView,
      },
      {
        path: '/account',
        name: 'Account',
        component: AccountView,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register'];
  const auth = store.loggedUser.token || null;
  const authRequired = !publicPages.includes(to.path);
  if (authRequired && !auth) {
    return '/login';
  }
});

export default router;
