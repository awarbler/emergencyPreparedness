const { Schema, model } = require("mongoose");

const foodSchema = new Schema({
  foodName: { type: String },
  brandName: { type: String },
  quantity: { type: String },
  purchaseDate: { type: String },
  expirationDate: { type: String },
  orderNextByDate: { type: String },
  description: { type: String }
});

module.exports = model("foods", foodSchema);
