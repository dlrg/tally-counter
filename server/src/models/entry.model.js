// entry-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const entry = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'event', required: true },
    count: { type: Number, required: true }
  }, {
    timestamps: true
  })

  return mongooseClient.model('entry', entry)
}
