import Vue from 'vue'
import Router from 'vue-router'
import TallyCounter from './views/TallyCounter.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'counter',
      component: TallyCounter
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
