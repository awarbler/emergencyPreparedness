const express = require('express');
const router = express.Router();

const hygieneController = require('../controllers/hygiene');

router.get('/', hygieneController.getAllHygienes);
router.get('/:name', hygieneController.getHygieneByName);
router.post('/', hygieneController.createNewHygiene);
router.put('/:name', hygieneController.updateHygiene);
router.delete('/:name', hygieneController.deleteHygiene);

module.exports = router;
