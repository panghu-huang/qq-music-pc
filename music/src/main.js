import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Lazyload from 'vue-lazyload'

Vue.use(Lazyload);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
