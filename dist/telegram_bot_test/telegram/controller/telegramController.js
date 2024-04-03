"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgHandler = exports.sendCommand = exports.getAllCommands = void 0;
const telegramCommand_1 = require("../../constants/command/telegramCommand");
const reponseUtil_1 = require("../../utils/reponseUtil");
const telegram_1 = require("../telegram");
const getAllCommands = async (req, res) => {
    try {
        const commands = telegramCommand_1.TelegramCommand.getAllTelegramCommands();
        (0, reponseUtil_1.successResponse)(res, "Commands fetched successfully", commands);
    }
    catch (error) {
        (0, reponseUtil_1.errorResponse)(res, error.message);
    }
};
exports.getAllCommands = getAllCommands;
const sendCommand = async (req, res) => {
    try {
        const result = req.body;
        var msgText = result.messageText.trim();
        const responseFromTelegram = telegram_1.Telegram.bot.sendMessage(result.chatId, msgText);
        (0, reponseUtil_1.successResponse)(res, "Send command successfully", responseFromTelegram);
    }
    catch (error) {
        (0, reponseUtil_1.errorResponse)(res, error.message);
    }
};
exports.sendCommand = sendCommand;
const msgHandler = async (value) => {
    const messageText = telegramCommand_1.commandToMessageMap[value.text] || "No command found!";
    telegram_1.Telegram.bot.sendMessage(value.chat.id, messageText);
};
exports.msgHandler = msgHandler;
//# sourceMappingURL=telegramController.js.map