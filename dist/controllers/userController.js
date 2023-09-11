"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUserTransactions = exports.getUser = exports.createUser = void 0;
const axios_1 = __importDefault(require("axios"));
const utility_1 = require("../utils/utility");
const validation_1 = require("../utils/validation");
const utility_2 = require("../utils/utility");
const utility_3 = require("../utils/utility");
const createUser = async (req, res) => {
    try {
        const { email, phone, pin } = req.body;
        (0, validation_1.validateUserCreation)({ email, phone, pin });
        const agentID = (0, utility_3.generateUserId)();
        const defaultUserData = {
            id: '',
            agentID: agentID,
            role: 'user',
            otp: utility_3.GenerateOTP
        };
        const userData = { ...defaultUserData, email, phone, pin };
        const savedUser = await (0, utility_2.createUserInDB)(userData);
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message,
        });
    }
};
exports.createUser = createUser;
const getUser = (req, res) => {
};
exports.getUser = getUser;
const getUserTransactions = async (req, res) => {
    const userID = req.params.id;
    const transactions = await axios_1.default.get(`${utility_1.MOCK_API_URL}/transactions?senderId=${userID}`);
    res.json(transactions.data);
};
exports.getUserTransactions = getUserTransactions;
const loginUser = async (req, res) => {
    try {
        const { email, pin } = req.body;
        (0, validation_1.validateUserLogin)({ email, pin });
        const User = await (0, utility_2.findUserByEmail)(email);
        if (!User) {
            throw new Error('User not found.');
        }
        if (User.pin !== pin || User.email !== email) {
            throw new Error('Invalid PIN.');
        }
        res.json({ message: "Login successful!" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.loginUser = loginUser;
