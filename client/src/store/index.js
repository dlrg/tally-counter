import feathersVuex from 'feathers-vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import feathers from '../api'

import eventDefaults from './instanceDefaults/event'

const { service, FeathersVuex } = feathersVuex(feathers, { idField: '_id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  state: {
    connection: false
  },
  mutations: {
    setConnection (state, payload) {
      state.connection = payload
    }
  },
  actions: {
  },
  plugins: [
    service('counter'),
    service('event', { instanceDefaults: eventDefaults }),
    service('channel-subscription')
  ]
})
