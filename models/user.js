const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  
  identifier: { type: String, unique: true },
  email: { type: String, unique: true },
  givenName: { type: String },
  familyName: { type: String },
  locale: { type: String },
  picture: { type: String }
  // hygieneItems: { type: [HygieneSchema] }
  // firstAidItems: { [firstAid]},
});

// module.exports = User = model("users", userSchema);
module.exports = model("users", userSchema);
