"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const sendMessage = async (chatId, token, message) => {
    await axios_1.default.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message !== null && message !== void 0 ? message : "",
    });
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=axiosService.js.map