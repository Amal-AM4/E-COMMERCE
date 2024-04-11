const express = require('express');
const { productList } = require('../controllers/productController');
const router = express.Router();


router.get('/productList', productList);




module.exports = router;