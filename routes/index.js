var express = require('express');
const homeController = require('../controllers/homeController');
const authenticateUser = require('../middlewares/authenticateUser');
var router = express.Router();

/* GET home page. */
router.get('/', homeController.homePage);

router.get('/products', homeController.pageProduct);
router.get('/cart', homeController.pageCart);
router.get('/product_details/:pid', homeController.pageProductDetails);

module.exports = router;
