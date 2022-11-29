const { Schema, model } = require('mongoose');

const firstAidSchema = new Schema({ 
    name: { type: String },
    quantity: { type: String },
    purchaseDate: { type: String },
});

// module.exports = model('first-aids', firstAidSchema);

module.exports = firstAidSchema;