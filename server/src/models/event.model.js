// event-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const event = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ['OPEN', 'CLOSED'], default: 'OPEN' }
  }, {
    timestamps: true
  })

  return mongooseClient.model('event', event)
};
