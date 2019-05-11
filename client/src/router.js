import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TallyCounter',
      component: () => import('./views/TallyCounter.vue')
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard'
    },
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: {
        layout: 'Admin'
      }
    },
    {
      path: '/admin/events',
      name: 'EventList',
      component: () => import('./views/EventList.vue'),
      meta: {
        layout: 'Admin'
      }
    },
    {
      path: '/admin/events/new',
      name: 'EventCreate',
      component: () => import('./views/EventEdit.vue'),
      meta: {
        layout: 'Admin',
        isCreate: true
      }
    },
    {
      path: '/admin/events/:eventId',
      name: 'EventDetail',
      component: () => import('./views/EventDetail.vue'),
      meta: {
        layout: 'Admin'
      }
    },
    {
      path: '/admin/events/:eventId/edit',
      name: 'EventEdit',
      component: () => import('./views/EventEdit.vue'),
      meta: {
        layout: 'Admin'
      }
    }
  ]
})
