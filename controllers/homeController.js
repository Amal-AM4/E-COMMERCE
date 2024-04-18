const jwt = require('jsonwebtoken');

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function homePage (req, res, next){
    const userToken = req.cookies.userToken;

    if (userToken === undefined) {
        res.render('index');
    } else {
        const user = jwt.verify(userToken, CODE);
        console.log(user);

        console.log("else part");
        res.render('index');
    }

    
}

async function pageProduct (req, res, next){
    res.render('products');
}

async function pageProductDetails (req, res){
    res.render('product_details');
}

async function pageCart (req, res){
    res.render('cart');
}

module.exports = {
    homePage, pageProduct, pageProductDetails, pageCart
}