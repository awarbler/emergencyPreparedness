const { Schema, model } = require('mongoose');

const hygieneSchema = new Schema({
  hygieneName: { type: String },
  hygieneQuantity: { type: String },
  hygienePurchaseDate: { type: String }
});

// module.exports = model('hygiene', hygieneSchema);
module.exports = hygieneSchema;
