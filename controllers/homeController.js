const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function homePage (req, res, next){
    const userToken = req.cookies.userToken;

    if (userToken === undefined) {
        res.render('index', { active: false });
    } else {
        const user = jwt.verify(userToken, CODE);
        try {
            const userModel = await prisma.user.findUnique({
                where: { id: user.userId }
            });

            res.render('index', { active: true, userTbl: userModel });
        } catch (error) {
            console.error(error);
        }
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