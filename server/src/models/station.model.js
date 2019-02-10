// station-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const station = new Schema({
    name: { type: String, required: true },
    positionId: { type: Schema.Types.ObjectId, ref: 'position', required: true },
    countDirection: { type: Number, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('station', station);
};
