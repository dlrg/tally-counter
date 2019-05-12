const errors = require('@feathersjs/errors')
/* eslint-disable no-unused-vars */
class Service {
  constructor ({app}) {
    this.app = app
    this.events = ['patched']
    this.counterCache = {}

    this._currentVisitors = async (eventId, count, clientId) => {
      const cachedCounter = this.counterCache[eventId]
      let data
      if (cachedCounter) {
        if (count) {
          addCount(cachedCounter, count, clientId)
        }
        data = cachedCounter
      } else {
        const entries = await app.service('entry').find({paginate: false, query: {eventId}})
        data = entries.reduce((stat, entry) => {
          addCount(stat, entry.count, entry.clientId)
          return stat
        }, {diff: 0, in: 0, out: 0, totalPerClient: {}})
        this.counterCache[eventId] = data
      }
      return {
        _id: eventId,
        data
      }
    }

    this._count = {
      up: async (eventId, clientId) => {
        return app.service('entry').create({eventId, count: 1, clientId})
          .then(res => this._currentVisitors(res.eventId, 1, res.clientId))
      },
      down: async (eventId, clientId) => {
        return app.service('entry').create({eventId, count: -1, clientId})
          .then(res => this._currentVisitors(res.eventId, -1, res.clientId))
      }
    }

  }

  async get (id, params) {
    return this._currentVisitors(id)
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }
    if (!(data.direction in this._count)) return new errors.BadRequest('Invalid direction', {direction: data.direction, available: Object.keys(this._count)})
    return this._count[data.direction](data.eventId, data.clientId)
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service

function addCount(stat, count, clientId) {
  stat.diff += count
  if (clientId) {
    if (!stat.totalPerClient[clientId]) stat.totalPerClient[clientId] = 0
    stat.totalPerClient[clientId]++
  }
  if (count < 0) {
    stat.out -= count
  } else {
    stat.in += count
  }
  return stat
}
