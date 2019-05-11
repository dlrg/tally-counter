// Initializes the `event-stats` service on path `/event-stats`
const createService = require('./event-stats.class.js')
const hooks = require('./event-stats.hooks')

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/event-stats', createService(app))

  // Get our initialized service so that we can register hooks
  const service = app.service('event-stats')

  service.hooks(hooks)
};
