const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const upload = require("../config/multerConfig");
const prisma = new PrismaClient();

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function loginPage (req, res) {
    res.render('admin-panal/login');
}

// handle admin login requests
async function adminLogin (req, res) {
    try {
        const {username, password} = req.body;
        const admin = await prisma.adminUser.findUnique({
            where: {
                username: username
            }
        });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found"});
        }

        let isPassVaild = false;

        if ((admin.password) === password) {
            isPassVaild = true;
        }

        if (!isPassVaild) {
            return res.status(401).json({message: "Invaild password"})
        }

        const token = jwt.sign({ adminId: admin.id }, CODE, { expiresIn: '1h' });

        res.cookie("adminToken", token, { httpOnly: true });

        res.redirect('/admin/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

async function adminLogout (req, res) {  
    res.clearCookie('adminToken');
    return res.redirect('/admin/login');
}


async function dashboard (req, res, next) {
    const adminData = req.admin;
    const pk = adminData.adminId;

    const adminUser = await prisma.adminUser.findUnique({
        where: { id:pk }
    });

    res.render('admin-panal/dashboard', { data: adminUser });
}

async function productCategoryEjs (req, res) {
    try {
        const productCat = await prisma.productCategory.findMany();
        res.render('admin-panal/product_category', { data: productCat, messages: req.flash() });
    } catch (error) {
        console.error(error);
    }
}

async function insertProductCategory (req, res) {  
    try {
        const pname = req.body.category;
        if (pname === '') {
            req.flash('error', 'Please entry something');
            return res.redirect('/admin/productCategory');
        }
        
        const newCat = await prisma.productCategory.findMany({
            where: {
                name: pname
            }
        });

        if (newCat.length != 0) {
            // category already exists
            console.log('we are in if stmt');
            req.flash('error', 'Category already exists');
            res.redirect('/admin/productCategory');
        } else {
            console.log('we are in else stmt');
            const newProCat = await prisma.productCategory.create({
                data: {
                    name: pname
                }
            });
            req.flash('success', 'Category added successfully');
            res.redirect('/admin/productCategory');
        }
    } catch (error) {
        console.error(error);
    }
}

async function addProduct (req, res) {
    try {
        const category = await prisma.productCategory.findMany();
        res.render('admin-panal/addProduct', {data: category});
    } catch (error) {
        console.error(error);
    }
}

// async function addProductItem (req, res) {
//     console.log('addproductitem through post method');
//     console.log(req.body);
// }


async function addProductItem (req, res) {  
    try {
        const category = req.body.category;
        const name = req.body.name;
        const qnty = req.body.qnty;
        const totalPrice = req.body.totalPrice;
        const discountPrice = req.body.discountPrice;
        const description = req.body.description;

        const thumbPath = req.file && req.file.path; // Get the uploaded file path

        console.log(name);

        const newProduct = await prisma.product.create({
            data: {
                categoryId: category,
                thumb_img: thumbPath,
                quantity: qnty,
                total_price: totalPrice,
                discount_price: discountPrice,
                desc: description,
                name: name // Include the actual value for the name field
            }
        });

        // req.flash('success', 'Product added successfully');
        res.redirect('/admin/addProduct');

    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    loginPage, adminLogin, adminLogout, 
    dashboard, 
    productCategoryEjs, insertProductCategory,
    addProduct, addProductItem
}