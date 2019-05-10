import feathersVuex from 'feathers-vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import feathers from './api'

const { service } = feathersVuex(feathers, { idField: '_id' })

Vue.use(Vuex)

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
    service('event'),
    service('channel-subscription')
  ]
})
