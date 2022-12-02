const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// make a route router.use('/api-docs', swaggerUi.serve); brother weston
// router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
