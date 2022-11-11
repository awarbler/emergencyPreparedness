const express = require('express');

const openCors = require('../middleware/openCors');
const cors = require('cors');
// const { Router } = require('express');


//routes

const router = express.Router();

const userRoutes = require('./user');

router.options(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })
);


router.use([openCors, express.json()]);
router.use('/user', userRoutes);

module.exports = router;
