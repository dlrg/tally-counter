import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import feathers from './api'
import Chart from 'chart.js'
import VueChartkick from 'vue-chartkick'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

['connect', 'reconnect'].forEach(event => feathers.io.on(event, () => store.commit('setConnection', true)));
['connect_error', 'reconnect_error'].forEach(event => feathers.io.on(event, () => store.commit('setConnection', false)))

Vue.config.productionTip = false
Vue.use(VueChartkick, { adapter: Chart })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
