const { validationResults } = require("express-validator");

const errorHandler = (req, res, next) => {
  const errors = validationResults(req);

  if (!errors.isEmpyt()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createValidator = (body) => [
  body("hygieneName".isAlpha()),
  body("hygieneQuantity".isNumber()),
  body("hygienePurchaseDate").isDate(),
  errorHandler
];

const updateValidator = (body) => [
  body("hygieneName".isAlpha()),
  body("hygieneQuantity".isNumber()),
  body("hygienePurchaseDate").isDate(),
  errorHandler
];

module.exports = {
  createValidator,
  updateValidator
};
