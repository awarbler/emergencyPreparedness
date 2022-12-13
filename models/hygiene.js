const { Schema, model } = require("mongoose");

const { Schema, model } = require("mongoose");

const HygieneSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: String,
    required: true
  }
});

module.exports = model("hygiene", HygieneSchema);
