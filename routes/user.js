const express = require('express');
//routes

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
// router.post('/', userController.createNewUser);
router.put('/:email', userController.updateUser);
router.delete('/:email', userController.deleteUser);

module.exports = router;
