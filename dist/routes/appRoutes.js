"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appController_1 = require("../controllers/appController");
const router = express_1.default.Router();
router.get('/', appController_1.appController1);
router.post('/', appController_1.appController);
exports.default = router;
