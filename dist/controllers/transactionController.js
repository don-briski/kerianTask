"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTransaction = exports.startTransaction = void 0;
const transactionService_1 = require("../utils/transactionService");
const startTransaction = async (req, res) => {
    try {
        const { agentID, walletID, amount, } = req.body;
        const transactionData = await (0, transactionService_1.initiateTransaction)(agentID, walletID, amount);
        res.json(transactionData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.startTransaction = startTransaction;
const completeTransaction = async (req, res) => {
    try {
        const { email, pin, otp, walletID, amount } = req.body;
        await (0, transactionService_1.executeTransaction)(email, pin, otp, walletID, amount);
        res.json({ message: 'Transaction successful!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.completeTransaction = completeTransaction;
