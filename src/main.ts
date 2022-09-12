import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './worldcup/router'
import store from './worldcup/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
