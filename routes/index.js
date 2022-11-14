const express = require('express');
const router = express.Router();

const openCors = require('../middleware/openCors');
const cors = require('cors');

// const { Router } = require('express');

//routes
const docRoutes = require('./swagger');
const userRoutes = require('./user');

router.options(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })
);
router.use('/', docRoutes);
router.use([openCors, express.json()]);
router.use('/users', userRoutes);

module.exports = router;
