// const { validationResults } = require('express-validator');

// const errorHandler = (req, res, next) => {
//   const errors = validationResults(req);

//   if (!errors.isEmpyt()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// const createValidator = (body) => [
//   body('name'.isAlpha()),
//   body('quantity'.isNumber()),
//   body('purchaseDate').isDate(),
//   errorHandler
// ];

// const updateValidator = (body) => [
//   body('name'.isAlpha()),
//   body('quantity'.isNumber()),
//   body('purchaseDate').isDate(),
//   errorHandler
// ];

// module.exports = {
//   createValidator,
//   updateValidator
// };
