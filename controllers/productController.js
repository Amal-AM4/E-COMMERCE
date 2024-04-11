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

async function productView (req, res) {
    try {
        const pid = req.params.pid;
        const id = parseInt(req.params.id);

        const productImg = await prisma.productGallery.findMany({
            where: {
                productId: id
            }
        });

        const productView = await prisma.product.findUnique({
            where: {
                pid: pid
            },
            include: {
                category: true,
                // productImg: true
            }
        });
        res.render('product/productView', { data: productView, dataImg: productImg });
    } catch (error) {
        console.error(error);
    }
}


module.exports = { 
    productList, productView
}