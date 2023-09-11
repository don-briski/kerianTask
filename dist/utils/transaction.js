"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTransaction = exports.initiateTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../utils/config");
const otpGenerator_1 = require("../utils/otpGenerator");
const emailService_1 = require("../utils/emailService");
const initiateTransaction = async (senderEmail, recipientWalletID, amount) => {
    const otp = (0, otpGenerator_1.generateOTP)();
    await axios_1.default.post(`${config_1.MOCK_API_URL}/otps`, {
        email: senderEmail,
        otp: otp,
        expiry: Date.now() + 15 * 60 * 1000 // 15 minutes expiry
    });
    await (0, emailService_1.sendOTP)(senderEmail, otp);
    return { message: "OTP sent to your email." };
};
exports.initiateTransaction = initiateTransaction;
const executeTransaction = async (senderEmail, pin, otp, recipientWalletID, amount) => {
    // Validate pin and otp against the database
    const { data: user } = await axios_1.default.get(`${config_1.MOCK_API_URL}/users?email=${senderEmail}`);
    if (!user || user.pin !== pin)
        throw new Error("Invalid user or PIN.");
    const { data: otps } = await axios_1.default.get(`${config_1.MOCK_API_URL}/otps?email=${senderEmail}`);
    const validOtp = otps.find(o => o.otp === otp && o.expiry > Date.now());
    if (!validOtp)
        throw new Error("Invalid or expired OTP.");
    const { data: senderWallet } = await axios_1.default.get(`${config_1.MOCK_API_URL}/wallets?email=${senderEmail}`);
    if (senderWallet.balance < amount)
        throw new Error("Insufficient funds.");
    await axios_1.default.patch(`${config_1.MOCK_API_URL}/wallets/${senderWallet.id}`, { balance: senderWallet.balance - amount });
    await axios_1.default.patch(`${config_1.MOCK_API_URL}/wallets/${recipientWalletID}`, { balance: recipientWallet.balance + amount });
    return { message: "Transaction successful!" };
};
exports.executeTransaction = executeTransaction;
