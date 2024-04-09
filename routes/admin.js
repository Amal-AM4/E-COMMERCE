const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/login', adminController.loginPage);


module.exports = router;