const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const transporter = require("./nodemailer");
const mailDesign = require("../template/mailTemplate");

const prisma = new PrismaClient();
require("dotenv").config();

async function pageRegistration (req, res) {
    try {
        res.render('user/register');
    } catch (error) {
        console.error(error);
    }
}

async function userRegistration (req, res) {
    try {
        const { name, email, password } = req.body;

        // validate gmail address format
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid Gmail address format' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.redirect('/users/registration');
        }

        // Create confirmation key and store user in the database
        const confirmationKey = generateUniqueRandomNumber();
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedconfirmationKey = await bcrypt.hash(confirmationKey, 10);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                confirmationKey: hashedconfirmationKey
            }
        });

        // Send confirmation email
        await sendConfirmationEmail(email, confirmationKey, name);
        
        res.redirect(`/users/confirmationKey/${email}`);

    } catch (error) {
        console.error(error);
    }
}

// sending code to corresponding mail
async function sendConfirmationEmail(senderMail, codeNo, name) {
    try {
        const info = await transporter.sendMail({
            from: {
                name: "MiniKart",
                address: process.env.USER
            },
            to: senderMail, 
            subject: "Confirmation Email for Your Account", 
            html: mailDesign(codeNo, name), 
        });
    } catch (error) {
        console.error(error);
    }
}

async function pageConfirmation (req, res) {
    try {
        const email = req.params.id;
        res.render('user/confirmationKey', { email: email});
    } catch (error) {
        console.error(error);
    }
}

async function userConfirmation (req, res) {
    try {
        const confirmationKey = req.body.keyValue;
        const email = req.params.id;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        }); 

        isConfirmed = await bcrypt.compare(confirmationKey, existingUser.confirmationKey);

        if (isConfirmed) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    isVerified: true
                }
            });
            return res.redirect('/');
        } else {
            console.log("invalid key");
        }

    } catch (error) {
        console.error(error);
    }
}





function generateUniqueRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber.toString();
}

module.exports = {
    pageRegistration, userRegistration, userConfirmation, pageConfirmation
};

