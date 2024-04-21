const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function homePage (req, res, next){
    const userToken = req.cookies.userToken;

    if (userToken === undefined) {
        try {
            const randomProduct = await prisma.product.findMany({
                take: 4,
                include: {
                    category: true
                }
            });

            const latestEntries = await prisma.product.findMany({
                orderBy: {
                  created_at: 'desc', // Assuming 'created_at' is the timestamp field
                },
                take: 8, // Limiting to 4 entries, you can adjust this as needed
                include: {
                    category: true
                }
            });

            const smartBand = await prisma.product.findUnique({
                where: { id: 13}
            });

            res.render('index', {
                    active: false, randomProduct: randomProduct, latestEntries: latestEntries,
                    smartBand: smartBand
                });
        } catch (error) {
            console.error(error);
        }
        
    } else {
        const user = jwt.verify(userToken, CODE);
        try {
            const userModel = await prisma.user.findUnique({
                where: { id: user.userId }
            });

            const randomProduct = await prisma.product.findMany({
                take: 4,
            });

            const latestEntries = await prisma.product.findMany({
                orderBy: {
                  created_at: 'desc', // Assuming 'created_at' is the timestamp field
                },
                take: 8, // Limiting to 4 entries, you can adjust this as needed
            });

            const smartBand = await prisma.product.findUnique({
                where: { id: 13}
            });

            res.render('index', {
                    active: true, userTbl: userModel, randomProduct: randomProduct, latestEntries: latestEntries,
                    smartBand: smartBand 
                });
        } catch (error) {
            console.error(error);
        }
    }
}

async function pageProduct (req, res, next){
    const userToken = req.cookies.userToken;

    if (userToken === undefined) {
        res.render('products', { active: false });
    } else {
        const user = jwt.verify(userToken, CODE);
        try {
            const userModel = await prisma.user.findUnique({
                where: { id: user.userId }
            });

            res.render('products', { active: true, userTbl: userModel });
        } catch (error) {
            console.error(error);
        }
    }
}

async function pageProductDetails (req, res){
    const userToken = req.cookies.userToken;
    const productId = req.params.pid;

    if (userToken === undefined) {
        try {
            const productData = await prisma.product.findUnique({
                where: {
                    pid: productId
                },
                include: {
                    category: true,
                    productImg: true
                }
            });

            res.render('product_details', { active: false, productData: productData });
        } catch (error) {
            console.error(error);
        }
        
    } else {
        const user = jwt.verify(userToken, CODE);
        try {
            const userModel = await prisma.user.findUnique({
                where: { id: user.userId }
            });

            res.render('product_details', { active: true, userTbl: userModel });
        } catch (error) {
            console.error(error);
        }
    }
}

async function pageCart (req, res){
    const userToken = req.cookies.userToken;

    if (userToken === undefined) {
        res.render('cart', { active: false });
    } else {
        const user = jwt.verify(userToken, CODE);
        try {
            const userModel = await prisma.user.findUnique({
                where: { id: user.userId }
            });

            res.render('cart', { active: true, userTbl: userModel });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = {
    homePage, pageProduct, pageProductDetails, pageCart
}