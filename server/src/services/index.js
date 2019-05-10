const entry = require('./entry/entry.service.js')
const position = require('./position/position.service.js')
const counter = require('./counter/counter.service.js')
const channelSubscription = require('./channel-subscription/channel-subscription.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(entry)
  app.configure(position)
  app.configure(counter)
  app.configure(channelSubscription)
}
