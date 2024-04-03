"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegram = void 0;
const app_config_1 = require("../constants/config/app.config");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const telegramController_1 = require("./controller/telegramController");
class Telegram {
    constructor() {
        Telegram.bot = new node_telegram_bot_api_1.default(app_config_1.AppConfig.TELEGRAM_BOT_TOKEN, {
            polling: app_config_1.AppConfig.TELEGRAM_POLLING,
            webHook: app_config_1.AppConfig.TELEGRAM_WEBHOOK,
        });
        const setupWebhook = async () => {
            if (app_config_1.AppConfig.TELEGRAM_WEBHOOK) {
                await Telegram.bot
                    .setWebHook(app_config_1.AppConfig.TELEGRAM_WEBHOOK_URL)
                    .then(() => {
                    console.log("Webhook has been set!");
                })
                    .catch((err) => {
                    console.error("Error setting webhook:", err);
                });
            }
        };
        setupWebhook().then(() => {
            Telegram.bot.on("message", (msg) => {
                console.log(msg);
                (0, telegramController_1.msgHandler)(msg);
            });
        });
    }
}
exports.Telegram = Telegram;
//# sourceMappingURL=telegram.js.map