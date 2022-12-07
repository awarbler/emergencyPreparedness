const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HygieneSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
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

module.exports = hygiene = mongoose.model("hygiene", HygieneSchema);
