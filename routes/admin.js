const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: 'public/product_thumb/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Get the file extension
        const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension; // Add extension to file name
        cb(null, fileName);
    }
});

const upload = multer({ storage });

const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.get('/login', adminController.loginPage);
router.post('/login', adminController.adminLogin);
router.post('/logout', adminController.adminLogout);
router.get('/dashboard', authenticateAdmin, adminController.dashboard);
router.get('/productCategory',authenticateAdmin, adminController.productCategoryEjs);
router.post('/productCategory', adminController.insertProductCategory);
router.get('/addProduct',authenticateAdmin, adminController.addProduct);
router.post('/addProduct', upload.single('thumb_img'), adminController.addProductItem);

router.get('/userdata', authenticateAdmin, adminController.viewUserData);
router.get('/orders', authenticateAdmin, adminController.ordersList);


module.exports = router;