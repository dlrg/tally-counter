const entry = require('./entry/entry.service.js')
const counter = require('./counter/counter.service.js')
const channelSubscription = require('./channel-subscription/channel-subscription.service.js')
const event = require('./event/event.service.js')
const eventStats = require('./event-stats/event-stats.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(entry)
  app.configure(counter)
  app.configure(channelSubscription)
  app.configure(event)
  app.configure(eventStats);
}
