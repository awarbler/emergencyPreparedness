const express = require("express");

const router = express.Router();

const loadUser = require("../middleware/loadUser");
const hygieneController = require("../controllers/hygiene");

router.use([loadUser]);

router.get("/", hygieneController.getAllHygienes);
router.get("/:name", hygieneController.getHygieneByName);
router.post("/", hygieneController.createNewHygiene);
router.put("/:name", hygieneController.updateHygiene);
router.delete("/:name", hygieneController.deleteHygiene);

module.exports = router;
