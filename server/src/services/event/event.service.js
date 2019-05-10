// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/event.model');
const hooks = require('./event.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/event', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('event');

  service.hooks(hooks);
};
