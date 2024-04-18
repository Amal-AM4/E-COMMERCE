const jwt = require('jsonwebtoken');

require('dotenv').config();
const CODE = process.env.JSON_KEY;

function authenticateUser (req, res, next) {
    const userToken = req.cookies.userToken;

    if (!userToken) {
        return res.redirect('/users/login');
    }

    try {
        const user = jwt.verify(userToken, CODE);
        req.user = user;
        console.log(req.user);
        next();
        
    } catch (error) {
        res.clearCookie('userToken');
        return res.redirect('/');
    }
}

module.exports = authenticateUser;