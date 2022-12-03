const { Schema, model } = require("mongoose");

const firstAidSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  purchaseDate: { type: String, required: true }
});

module.exports = model("first-aids", firstAidSchema);
