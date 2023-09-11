"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
//middleware
app.use('/transaction', transactionRoutes_1.default);
app.use('/user', userRoutes_1.default);
const port = 5000;
app.listen(port, () => {
    console.log(`app running at localhost:${port}`);
});
