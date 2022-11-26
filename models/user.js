const { Schema, model } = require('mongoose');

const userSchema = new Schema({ 
//   identifier: { type: String, unique: true },
//   userName: { type: String },
//   email: { type: String, unique: true },
//   password: { type: String },
//   givenName: { type: String },
//   familyName: { type: String },
//   locale: { type: String },
//   picture: { type: String },
  identifier: { type: String, unique: true },
  email: { type: String, unique: true },
  givenName: { type: String },
  familyName: { type: String },
  locale: { type: String },
  picture: { type: String },
});

module.exports = model('users', userSchema);