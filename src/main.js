import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/main.less'

// import VueElectron from 'vue-electron'

Vue.config.productionTip = false

// Vue.use(VueElectron)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
