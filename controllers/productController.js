const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function productList (req, res) {
    try {
        const productData = await prisma.product.findMany();
        res.render('product/productList', { data: productData });
    } catch (error) {
        console.error(error);
    }
}


module.exports = { 
    productList
}