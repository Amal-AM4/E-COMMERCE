const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function productList (req, res) {
    res.render('product/productList')
}


module.exports = { 
    productList
}