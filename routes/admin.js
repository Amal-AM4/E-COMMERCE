const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.get('/login', adminController.loginPage);
router.post('/login', adminController.adminLogin);
router.post('/logout', adminController.adminLogout);
router.get('/dashboard', authenticateAdmin, adminController.dashboard);
router.get('/productCategory',authenticateAdmin, adminController.productCategoryEjs);
router.post('/productCategory', adminController.insertProductCategory);
router.get('/addProduct', adminController.addProduct);


module.exports = router;