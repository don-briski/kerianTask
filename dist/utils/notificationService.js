"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});
const sendOTP = async (toEmail, otp) => {
    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com',
        to: toEmail,
        subject: 'Your OTP',
        text: `Your OTP for the transaction is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
};
exports.sendOTP = sendOTP;
