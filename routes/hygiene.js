const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");
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
router.post(
  "/", // validate that the name is not empty
  [
    check("name").not().isEmpty(),
    check("quanitiy").not().isEmpty(),
    check("purchaseDate").not().isEmpty()
  ],
  hygieneController.createNewHygiene
);
router.put(
  "/:name",
  [
    check("name").not().isEmpty(),
    check("quanitiy").not().isEmpty(),
    check("purchaseDate").not().isEmpty()
  ],
  hygieneController.updateHygiene
);
router.delete("/:name", hygieneController.deleteHygiene);

module.exports = router;
