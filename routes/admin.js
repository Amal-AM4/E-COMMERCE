const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/login', adminController.loginPage);

router.post('/login', adminController.adminLogin);

router.get('/dashboard', (req, res) => {
    res.send('dashboard test')
});


module.exports = router;