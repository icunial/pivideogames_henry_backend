"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 5000;
const app = express_1.default.application = (0, express_1.default)();
// Body-Parser Middleware 
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Res Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// Initialized Express Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
