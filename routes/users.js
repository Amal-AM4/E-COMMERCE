var express = require('express');
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticateUser');
var router = express.Router();

router.get('/login', userController.userLogin);
router.post('/logout', userController.userLogout);
router.get('/logout', userController.userLogout);
router.post('/login', userController.loginProcess);

router.get('/registration', userController.pageRegistration);
router.post('/regConfirmation', userController.userRegistration);
router.get('/confirmationKey/:id', userController.pageConfirmation);
router.post('/confirmationKey/:id', userController.userConfirmation);

router.get('/dashboard', authenticateUser, userController.dashboard);
router.get('/cart-items', authenticateUser, userController.cartItems);
router.get('/order-list', authenticateUser, userController.orderList);


module.exports = router;
