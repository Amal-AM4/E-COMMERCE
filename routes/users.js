var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.get('/login', userController.userLogin);
router.post('/login', userController.loginProcess);

router.get('/registration', userController.pageRegistration);
router.post('/regConfirmation', userController.userRegistration);
router.get('/confirmationKey/:id', userController.pageConfirmation);
router.post('/confirmationKey/:id', userController.userConfirmation);

module.exports = router;
