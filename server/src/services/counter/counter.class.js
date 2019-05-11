const errors = require('@feathersjs/errors')
/* eslint-disable no-unused-vars */
class Service {
  constructor ({app}) {
    this.app = app
    this.events = ['patched']
    this.counterCache = {}

    this._currentVisitors = async (eventId, count) => {
      const cachedCounter = this.counterCache[eventId]
      let data
      if (cachedCounter) {
        if (count) {
          addCount(cachedCounter, count)
        }
        data = cachedCounter
      } else {
        const entries = await app.service('entry').find({paginate: false, query: {eventId}})
        data = entries.reduce((stat, entry) => {
          addCount(stat, entry.count)
          return stat
        }, {diff: 0, in: 0, out: 0})
        this.counterCache[eventId] = data
      }
      return {
        _id: eventId,
        data
      }
    }

    this._count = {
      up: async (eventId) => {
        return app.service('entry').create({eventId, count: 1})
          .then(res => this._currentVisitors(res.eventId, 1))
      },
      down: async (eventId) => {
        return app.service('entry').create({eventId, count: -1})
          .then(res => this._currentVisitors(res.eventId, -1))
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
    return this._count[data.direction](data.eventId)
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service

function addCount(stat, count) {
  stat.diff += count
  if (count < 0) {
    stat.out -= count
  } else {
    stat.in += count
  }
  return stat
}
