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
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
         user: "mchisty31@gmail.com",
         pass: "txbw ewgo dwaw rqnd",
        },
       });
     
    const mailOptions = {
        from: `${name} <${email}>`,
        to: "mchisty31@gmail.com",  // Replace with your email address
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


