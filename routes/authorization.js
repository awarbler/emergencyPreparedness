const { Router } = require('express');
const authorizationController = require('../controllers/authorization');

const router = Router();

router.get('/login', authorizationController.login);
router.get('/callback', authorizationController.callback);

module.exports = router;
