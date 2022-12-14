const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const hygieneController = require("../controllers/hygiene");
const loadUser = require("../middleware/loadUser");

router.use([loadUser]);

router.get("/", hygieneController.getAllHygienes);
router.get("/:name", hygieneController.getHygieneByName);
router.post("/", hygieneController.createNewHygiene);
router.put("/:name", hygieneController.updateHygiene);
router.delete("/:name", hygieneController.deleteHygiene);

module.exports = router;
