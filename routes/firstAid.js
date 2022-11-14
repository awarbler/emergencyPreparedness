const express = require('express');

// const { Router } = require('express');


//routes

const router = express.Router();

const firstAidController = require('../controllers/firstAid');

router.get('/', firstAidController.getAllFirstAidItems);
router.get('/:name', firstAidController.getFirstAidItemByName);
router.post('/', firstAidController.createNewFirstAidItem);
router.put('/:name', firstAidController.updateFirstAidItem);
router.delete('/:name', firstAidController.deleteFirstAidItem);

module.exports = router;