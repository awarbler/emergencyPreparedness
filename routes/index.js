const express = require('express');
const router = express.Router();

const openCors = require('../middleware/openCors');
const cors = require('cors');

// const { Router } = require('express');

//routes
const docRoutes = require('./swagger');
const userRoutes = require('./user');

const hygieneRoutes = require('./hygiene');

const firstAidRoutes = require('./firstAid');

const foodRoutes = require('./food')


router.options(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })
);
router.use('/', docRoutes);
router.use([openCors, express.json()]);
router.use('/users', userRoutes);

router.use('/hygienes', hygieneRoutes);

router.use('/firstAid', firstAidRoutes);

router.use('/food',foodRoutes);


module.exports = router;
