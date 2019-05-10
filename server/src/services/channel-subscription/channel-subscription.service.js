// Initializes the `channel-subscription` service on path `/channel-subscription`
const createService = require('./channel-subscription.class.js')
const hooks = require('./channel-subscription.hooks')

module.exports = function (app) {
  
  const options = {
    app
  }

  // Initialize our service with any options it requires
  app.use('/channel-subscription', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('channel-subscription')

  service.hooks(hooks)
  
  
}
