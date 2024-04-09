const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
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

async function dashboard (req, res, next) {
    const adminData = req.admin;
    const pk = adminData.adminId;

    const adminUser = await prisma.adminUser.findUnique({
        where: { id:pk }
    });

    res.render('admin-panal/dashboard', { data: adminUser });
}


module.exports = { loginPage, adminLogin, dashboard }