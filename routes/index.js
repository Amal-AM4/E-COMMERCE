var express = require('express');
const homeController = require('../controllers/homeController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/products', homeController.pageProduct);
router.get('/cart', homeController.pageCart);
router.get('/product_details', homeController.pageProductDetails);

module.exports = router;
