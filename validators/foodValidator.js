// const { validationResults } = require('express-validator');
// const errorHandler = (req, res, next) => {
//   const errors = validationResults(req);

//   if (!errors.isEmpyt()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// const createValidator = (body) => [
//   body('foodName'.isAlpha()),
//   body('brandName'.isAlpha()),
//   body('quantity'.isNumber()),
//   body('purchaseDate'.isDate()),
//   body('expirationDate'.isDate()),
//   body('orderNextByDate'.isDate()),
//   body('description').isAlpha(),
//   errorHandler
// ];

// const updateValidator = (body) => [
//   body('foodName'.isAlpha()),
//   body('brandName'.isAlpha()),
//   body('quantity'.isNumber()),
//   body('purchaseDate'.isDate()),
//   body('expirationDate'.isDate()),
//   body('orderNextByDate'.isDate()),
//   body('description').isAlpha(),
//   errorHandler
// ];

// module.exports = {
//   createValidator,
//   updateValidator
// };
