/* eslint-disable no-unused-vars */
class Service {
  constructor ({app}) {
    this.app = app
  }

  async create (data, params) {
    if (params.connection) {
      this.app.channel(`event/${data.eventId}`).join(params.connection)
    }

    return data
  }

  async remove (id, params) {
    if (params.connection) {
      this.app.channel(`event/${id}`).leave(params.connection)
    }

    return { id }
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
