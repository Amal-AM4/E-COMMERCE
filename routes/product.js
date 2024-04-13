const express = require('express');
const { productList,productView,productGallery } = require('../controllers/productController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: 'public/product_gallery/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Get the file extension
        const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension; // Add extension to file name
        cb(null, fileName);
    }
});

const upload = multer({ storage });

router.get('/productList', authenticateAdmin, productList);
router.get('/productView/:pid/:id', authenticateAdmin, productView);
router.get('/productGallery/:id', authenticateAdmin, productGallery);



module.exports = router;