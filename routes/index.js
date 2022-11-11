const express = require('express');

const openCors = require('../middleware/openCors');
const cors = require('cors');
const { Router } = require('express');

//routes

const router = express.Router();

router.options(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })
);

router.use([openCors, express.json()]);

module.exports = router;
