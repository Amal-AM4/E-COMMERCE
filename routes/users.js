var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.get('/login', userController.userLogin);
router.get('/logout', userController.userLogout);
router.post('/login', userController.loginProcess);

router.get('/registration', userController.pageRegistration);
router.post('/regConfirmation', userController.userRegistration);
router.get('/confirmationKey/:id', userController.pageConfirmation);
router.post('/confirmationKey/:id', userController.userConfirmation);

router.get('/dashboard', (req, res) => {
    res.send('dashboard')
});

module.exports = router;
