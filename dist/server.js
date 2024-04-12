"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisService_1 = require("./service/redisService");
const controller_1 = require("./controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.post("/sendMessage", controller_1.handleMessage);
app.listen(process.env.PORT, async () => {
    await (0, redisService_1.initRedis)();
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map