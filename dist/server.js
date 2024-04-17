"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisService_1 = require("./service/redisService");
const controller_1 = require("./controller");
const app_config_1 = require("./constant/app_config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.post("/sendMessage", controller_1.handleMessage);
app.listen(app_config_1.PORT, async () => {
    await (0, redisService_1.initRedis)();
    console.log(`Server running on port ${app_config_1.PORT}`);
});
//# sourceMappingURL=server.js.map