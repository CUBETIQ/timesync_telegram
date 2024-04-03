"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const axios_1 = __importDefault(require("axios"));
const app_config_1 = require("../../constants/config/app.config");
class TelegramService {
}
exports.TelegramService = TelegramService;
_a = TelegramService;
TelegramService.postToWebhook = async (data) => {
    try {
        const webhookUrl = app_config_1.AppConfig.WEBHOOK_URL;
        await axios_1.default.post(webhookUrl, data);
    }
    catch (error) {
    }
};
//# sourceMappingURL=telegramService.js.map