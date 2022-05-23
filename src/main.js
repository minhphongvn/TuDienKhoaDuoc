import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import NProgress from 'vue-nprogress'

Vue.config.productionTip = false
const options = {
  // latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
  router: true, // Show progressbar when navigating routes, default: true
  // http: false // Show progressbar when doing Vue.http, default: true
  color: 'red',
};
Vue.use(NProgress, options)
const nprogress = new NProgress()
Vue.prototype.$showAlert = (msg, type) => store.commit('setAlert', { msg, type })

new Vue({
  nprogress,
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
