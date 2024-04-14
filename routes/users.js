var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.get('/registration', userController.pageRegistration);
router.post('/regConfirmation', userController.userRegistration);
router.get('/confirmationKey', userController.userConfirmation);

module.exports = router;
