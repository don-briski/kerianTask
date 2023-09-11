"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.loginSchema = exports.validateUserCreation = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    pin: joi_1.default.string().min(6).max(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
const validateUserCreation = (data) => {
    const validationResult = exports.UserSchema.validate(data);
    if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message + "validation error");
    }
    return true;
};
exports.validateUserCreation = validateUserCreation;
//login validation
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    pin: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
});
const validateUserLogin = (data) => {
    const validationResult = exports.loginSchema.validate(data);
    if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message);
    }
    return true;
};
exports.validateUserLogin = validateUserLogin;
