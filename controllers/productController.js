const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function productList (req, res) {
    try {
        const productData = await prisma.product.findMany({
            include: {
                category: true //category    product[] @relation("CategoryList") in model schema
            }
        });
        res.render('product/productList', { data: productData });
    } catch (error) {
        console.error(error);
    }
}


module.exports = { 
    productList
}