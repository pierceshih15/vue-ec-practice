// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false;
// // 儲存 SessionCookie
// Vue.defaults.withCredentials = true;

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
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證');

    const api = `${process.env.APIPATH}/api/user/check`;
    // 由於在 main.js 無法呼叫元件內的 this，故直接採用 axios
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        })
      }
    });
  } else {
    next();
  }
})
