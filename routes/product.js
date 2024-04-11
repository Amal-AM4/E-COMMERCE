const express = require('express');
const { productList,productView } = require('../controllers/productController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const router = express.Router();

router.get('/productList', authenticateAdmin, productList);
router.get('/productView/:pid/:id', authenticateAdmin, productView);



module.exports = router;