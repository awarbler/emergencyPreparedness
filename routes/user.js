const express = require('express');

// const { Router } = require('express');


//routes

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);

module.exports = router;
