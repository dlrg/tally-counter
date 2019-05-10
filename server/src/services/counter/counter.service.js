// Initializes the `counter` service on path `/counter`
const createService = require('./counter.class.js')
const hooks = require('./counter.hooks')

module.exports = function (app) {

  const options = {
    name: 'counter',
    app
  }

  // Initialize our service with any options it requires
  app.use('/counter', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('counter')

  service.hooks(hooks)
}

