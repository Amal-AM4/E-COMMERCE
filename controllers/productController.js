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

async function productGallery (req, res) {  
    try {
        const pid = parseInt(req.params.id);
        const productImg = await prisma.productGallery.findMany({
            where: {
                productId: pid
            }
        });
        const productData = await prisma.product.findUnique({
            where: {
                id: pid
            }
        });
        res.render('product/productGallery', { gallery: productImg, product: productData, messages: req.flash() });
    } catch (error) {
        console.error(error);
    }
}

async function addProductGallery (req, res) {
    try {
        const id = parseInt(req.params.id);
        const thumbPath = req.file ? req.file.path : null;

        if (thumbPath === null) {
            req.flash('error', 'Please upload a image.');
            return res.redirect(`/admin/product/productGallery/${id}`);
        } else {
            const addImage = await prisma.productGallery.create({
                data: {
                    productId: id,
                    image: thumbPath
                }
            });
            req.flash('success', 'Image uploaded successfully.');
            return res.redirect(`/admin/product/productGallery/${id}`);
        }

    } catch (error) {
        console.error(error);
    }
}

async function removeProductGallery (req, res) {  
    try {
        const id = parseInt(req.params.id);
        const pageId = parseInt(req.params.pageId);
        const deletedRecord = await prisma.productGallery.delete({
            where: { id: id }
        });
        res.redirect(`/admin/product/productGallery/${pageId}`);
    } catch (error) {
        console.error(error);
    }
}


module.exports = { 
    productList, productView, productGallery, addProductGallery, removeProductGallery
}