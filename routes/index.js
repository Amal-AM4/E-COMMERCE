var express = require('express');
const homeController = require('../controllers/homeController');
const authenticateUser = require('../middlewares/authenticateUser');
const paymentController = require('../controllers/paymentController');
var router = express.Router();

/* GET home page. */
router.get('/', homeController.homePage);

router.get('/products', homeController.pageProduct);
router.get('/cart', homeController.pageViewCart);
router.get('/cart/:uid/:pid/:qty', homeController.pageCart);
router.get('/product_details/:pid', homeController.pageProductDetails);
router.get('/remove-cart/:id', authenticateUser, homeController.removeCartItem);

router.get('/payment-gateway/:uid/:pid/:qty', authenticateUser, paymentController.viewPaymentGateway);
router.post('/process-payment', paymentController.payment);

router.get('/payment-success', paymentController.paymentSuccess);

module.exports = router;
