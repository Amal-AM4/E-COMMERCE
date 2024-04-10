const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/product_thumb', // Destination folder for uploaded images
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${file.originalname.split('.').pop()}`);
    }
});

const upload = multer({ storage });

module.exports = upload;
