const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.get('/login', adminController.loginPage);

router.post('/login', adminController.adminLogin);

router.get('/dashboard', authenticateAdmin, adminController.dashboard);


module.exports = router;