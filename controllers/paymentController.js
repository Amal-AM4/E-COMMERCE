const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const stripe = require('../config/stripeConfig');
const prisma = new PrismaClient();

require('dotenv').config();
const CODE = process.env.JSON_KEY;

const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY;

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
            const uid = parseInt(req.params.uid);
            const pid = parseInt(req.params.pid);
            const qty = parseInt(req.params.qty);
            
            const userModel = await prisma.user.findUnique({
                where: { id: uid }
            });

            const productData = await prisma.product.findUnique({
                where: { id: pid }
            });


            res.render('paymentGateway', { active: true, userTbl: userModel, 
                productData: productData, qty: qty, STRIPE_PUBLIC_KEY: STRIPE_PUBLIC_KEY});
        } catch (error) {
            console.error(error);
        }
    }
}

async function payment (req, res) {
    // const { tokenId, cardholderName, quantity, amount, userId, productId  } = req.body;
    const { paymentMethodId, cardholderName, quantity, amount, userId, productId  } = req.body;
    console.log('test payment post method');
    console.log(`${paymentMethodId}, ${cardholderName}, ${quantity}, ${amount}, ${userId}, ${productId},`);

    try {
        // Create a payment intent using the Stripe SDK
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount), // Calculate the total amount based on quantity
            currency: 'inr', // Change to your desired currency
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'http://localhost:3000/payment-success',
        });

        // Store payment details in the database using Prisma
        const payment = await prisma.payment.create({
            data: {
                userId: parseInt(userId), // Assuming user ID is available in the request
                productId: parseInt(productId), // Assuming product ID is available in the request
                cardHolderName: cardholderName,
                quantity: parseInt(quantity),
                amount: parseInt(amount), // Store the total amount in the database
                currency: 'inr', // Change to your desired currency
                paymentIntentId: paymentMethodId,
                paymentDate: new Date(),
            },
        });

        

    } catch (error) {
        console.error(error);
    }

}

async function paymentSuccess (req, res) {  
    res.render('payment-success');
}

module.exports = { viewPaymentGateway, payment, paymentSuccess };