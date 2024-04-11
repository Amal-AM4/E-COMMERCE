const express = require('express');
const { productList } = require('../controllers/productController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const router = express.Router();


router.get('/productList', authenticateAdmin, productList);




module.exports = router;