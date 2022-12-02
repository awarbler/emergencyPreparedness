const { Schema, model } = require("mongoose");

const hygieneSchema = new Schema({
  name: { type: String },
  quantity: { type: String },
  purchaseDate: { type: String }
});

module.exports = model("hygiene", hygieneSchema);
