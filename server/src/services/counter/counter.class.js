const errors = require('@feathersjs/errors')
/* eslint-disable no-unused-vars */
class Service {
  constructor ({app}) {
    this.app = app
    this.events = ['patched']

    this._currentVisitors = async (eventId) => {
      const entries = await app.service('entry').find({paginate: false, query: {eventId}})
      const data = entries.reduce((prev, cur) => prev + cur.count, 0)
      return {
        _id: eventId,
        data
      }
    }

    this._count = {
      up: async (eventId) => {
        return app.service('entry').create({eventId, count: 1})
          .then(res => this._currentVisitors(res.eventId))
      },
      down: async (eventId) => {
        return app.service('entry').create({eventId, count: -1})
          .then(res => this._currentVisitors(res.eventId))
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
