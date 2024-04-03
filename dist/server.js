"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./telegram/routes"));
const telegram_1 = require("./telegram/telegram");
const app_config_1 = require("./constants/config/app.config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/telegram", routes_1.default);
new telegram_1.Telegram();
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(app_config_1.AppConfig.PORT, () => {
    console.log(`Server is running on port ${app_config_1.AppConfig.PORT}`);
});
//# sourceMappingURL=server.js.map