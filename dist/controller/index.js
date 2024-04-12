"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRedisMessage = exports.handleMessage = void 0;
const string_util_1 = require("../util/string_util");
const bullService_1 = require("../service/bullService");
const handleMessage = async (req, res) => {
    const { chatId, token, message } = req.body;
    if (!chatId || !token || !message) {
        res.status(400).send("Missing required parameters {chatId, token, message}");
        return;
    }
    const myMessage = message;
    bullService_1.messageQueue.add({ chatId, token, myMessage });
    res.send("Message added to queue");
};
exports.handleMessage = handleMessage;
const handleRedisMessage = async (data) => {
    try {
        console.log("Attendance created:", data);
        const eventData = Object.assign({}, JSON.parse(data));
        const { telegram, data: message } = eventData;
        const { chatId, token } = telegram;
        if (!chatId || !token || !message) {
            console.error("Required properties (chatId, token, message) are missing in the data");
            return;
        }
        const myMessage = (0, string_util_1.formatTelegramMessage)(eventData.type, message);
        await bullService_1.messageQueue.add({ chatId, token, myMessage });
    }
    catch (error) {
        console.error("Error processing attendance data:", error.message);
    }
};
exports.handleRedisMessage = handleRedisMessage;
//# sourceMappingURL=index.js.map