const express = require("express");
//routes
const router = express.Router();

const loadUser = require("../middleware/loadUser");
const firstAidController = require("../controllers/firstAid");

router.use([loadUser]);

router.get("/", firstAidController.getAllFirstAidItems);
router.get("/:name", firstAidController.getFirstAidItemByName);
router.post("/", firstAidController.createNewFirstAidItem);
router.put("/:name", firstAidController.updateFirstAidItem);
router.delete("/:name", firstAidController.deleteFirstAidItem);

module.exports = router;
