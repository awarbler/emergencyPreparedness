const express = require('express');
const router = express.Router();
// const { body, param } = require('express-validator');
// const {
//     createValidator,
//     showValidator,
//     updateValidator,
//     destroyValidator
// } = require('../validators/foodValidator.js');

const foodController = require('../controllers/food');

router.get('/', foodController.getAllFood);
router.get('/:foodName', foodController.getFoodByfoodName);
router.post('/', foodController.createNewFoodItem);
router.put('/:foodName', foodController.updateFoodItem);
router.delete('/:foodName', foodController.deleteFoodItem);

module.exports = router;
