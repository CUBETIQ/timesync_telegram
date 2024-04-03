"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AppConfig {
}
exports.AppConfig = AppConfig;
AppConfig.PORT = process.env.PORT || 3000;
AppConfig.APP_MODE = process.env.APP_MODE || "development";
AppConfig.WEBHOOK_URL = process.env.WEBHOOK_URL || "";
AppConfig.TELEGRAM_POLLING = process.env.TELEGRAM_POLLING === "true" || false;
AppConfig.TELEGRAM_WEBHOOK = process.env.TELEGRAM_WEBHOOK === "true" || false;
AppConfig.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
AppConfig.TELEGRAM_WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL || "";
//# sourceMappingURL=app.config.js.map