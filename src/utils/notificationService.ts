import nodemailer from 'nodemailer';
import dotenv from  'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
         user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});

export const sendOTP = async (toEmail: string, otp: { otp: number; expiry: Date; }) => {
    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com',
        to: toEmail,
        subject: 'Your OTP',
        text: `Your OTP for the transaction is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
};
