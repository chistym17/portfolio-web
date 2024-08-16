require('dotenv').config();
const express = require('express');
const cors = require('cors');



const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
origin:'*'

}));

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/sendemail', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        // Configure your email service provider here
        // Example for using a Gmail account:
        service: 'gmail',
        auth: {
            user: process.env.db_email,
            pass: process.env.db_pass,
        },
    });

    const mailOptions = {
        from: `${name} <${email}>`,
        to: process.env.db_email,  // Replace with your email address
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
