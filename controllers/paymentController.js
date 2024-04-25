const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const stripe = require('../config/stripeConfig');
const prisma = new PrismaClient();

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function viewPaymentGateway (req, res) {  
    const userToken = req.cookies.userToken;
    if (userToken === undefined) {
        try {
            res.render('paymentGateway', { active: false });
        } catch (error) {
            console.error(error);
        }
        
    } else {
        const user = jwt.verify(userToken, CODE);
        try {

            // const { uid, pid, qty} = req.params;
            const uid = parseInt(req.params.uid);
            const pid = parseInt(req.params.pid);
            const qty = parseInt(req.params.qty);

            console.log(`${uid} ${pid} ${qty}`);
            
            const userModel = await prisma.user.findUnique({
                where: { id: uid }
            });

            const productData = await prisma.product.findUnique({
                where: { id: pid }
            });


            res.render('paymentGateway', { active: true, userTbl: userModel, productData: productData, qty: qty });
        } catch (error) {
            console.error(error);
        }
    }


    
}


module.exports = viewPaymentGateway;