const express = require("express");
const router = express.Router();
// const { body, param } = require('express-validator');
// const {
//     createValidator,
//     showValidator,
//     updateValidator,
//     destroyValidator
// } = require('../validators/hygieneValidator.js');
const hygieneController = require("../controllers/hygiene");
const loadUser = require("../middleware/loadUser");

router.use([loadUser]);

router.get("/", hygieneController.getAllHygienes);
router.get("/:name", hygieneController.getHygieneByName);
router.get("/:id", hygieneController.getHygieneById);
router.post("/", hygieneController.createNewHygiene);
router.put("/:name", hygieneController.updateHygiene);
router.delete("/:name", hygieneController.deleteHygiene);

module.exports = router;
