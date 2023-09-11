"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_PASSWORD'
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
