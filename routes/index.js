const express = require("express");
const router = express.Router();

const openCors = require("../middleware/openCors");
const cors = require("cors");

//routes
const hygieneRoutes = require("./hygiene");
const authorizationRoutes = require("./authorization");
const docRoutes = require("./swagger");
const userRoutes = require("./user");
const firstAidRoutes = require("./firstAid");
const foodRoutes = require("./food");

router.options(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);

// global middleware added to see if I can get test to work
router.use([openCors, express.json()]);

router.use("/", docRoutes);
router.use([openCors, express.json()]);
router.use("/users", userRoutes);
router.use("/hygienes", hygieneRoutes);
router.use("/firstAid", firstAidRoutes);
router.use("/food", foodRoutes);
router.use("/authorization", authorizationRoutes);

module.exports = router;
