import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import './assets/css/base.css';
import App from './app.vue';
import './assets/js/jQuery.js';
import NavList from './study/views/nav-list';
import Alert from './study/components/alert';
import LoginState from './study/components/login-state';
import Transition from './study/components/transition';

import createRouter from './router/router';
import createStore from './store/store';

Vue.component('navList', NavList);
Vue.component('alert', Alert);
Vue.component('loginState', LoginState);
Vue.component('transitions', Transition);
Vue.prototype.axios = Axios;

Vue.use(VueRouter);

const router = createRouter();
const store = createStore();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});
