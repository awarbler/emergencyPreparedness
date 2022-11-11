const { Schema, model } = require('mongoose');

const userSchema = new Schema({ 
    userName: { type: String },
    email: { type: String },
    password: { type: String },
});

module.exports = model('users', userSchema);