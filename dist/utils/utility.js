"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.GenerateOTP = exports.generateUserId = exports.option = exports.createUserInDB = exports.MOCK_API_URL = void 0;
exports.MOCK_API_URL = 'http://localhost:3010';
const axios_1 = __importDefault(require("axios"));
const createUserInDB = (data) => {
    return axios_1.default.post(`${exports.MOCK_API_URL}/users`, data).then(response => response.data);
};
exports.createUserInDB = createUserInDB;
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
const generateUserId = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};
exports.generateUserId = generateUserId;
const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOTP = GenerateOTP;
const findUserByEmail = (email) => {
    return axios_1.default.get(`${exports.MOCK_API_URL}/users?email=${email}`).then(response => response.data[0]);
};
exports.findUserByEmail = findUserByEmail;
