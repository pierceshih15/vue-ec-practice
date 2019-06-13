// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './filters/currency';

import App from './App'
import router from './router'

Vue.use(VueAxios, axios)
// 套用全域使用
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

Vue.config.productionTip = false;
// 儲存 SessionCookie
Vue.axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  // 是否需要驗證
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;
    // 由於在 main.js 無法呼叫元件內的 this，故直接採用 axios
    axios.post(api).then(response => {
      console.log(response.data);
      // 若登入成功，則前往下個頁面前進
      if (response.data.success) {
        next();
      } else {
        // 反之，則跳轉至登入頁面
        next({
          path: '/login',
        })
      }
    });
  } else {
    next();
  }
})
