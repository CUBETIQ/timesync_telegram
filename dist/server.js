"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bull_1 = __importDefault(require("bull"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const messageQueue = new bull_1.default("message", {
    defaultJobOptions: {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
        backoff: { type: "exponential", delay: 1000 },
    },
});
const onFailed = async () => {
    try {
        const jobs = await messageQueue.getFailed();
        if (jobs.length === 0)
            return;
        jobs.forEach(async (job) => {
            console.log("Failed job:", job.data);
            await messageQueue.add(job.data);
        });
    }
    catch (error) {
        console.error("Error handling failed jobs:", error);
    }
};
messageQueue.on("failed", (job, error) => {
    console.log(`Job ${job.id} failed with error: ${error.message}`);
    onFailed();
});
messageQueue.process(async (job, done) => {
    const { chatId, token, message } = job.data;
    console.log("Sending message to chatId:", chatId);
    try {
        await sendMessage(chatId, token, message);
        console.log("Message sent successfully!");
        done();
    }
    catch (error) {
        console.error("Error sending message:", error);
        done(error);
    }
});
const sendMessage = async (chatId, token, message) => {
    await axios_1.default.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
    });
};
app.post("/sendMessage", async (req, res) => {
    const { chatId, token, message } = req.body;
    if (!chatId || !token || !message) {
        res.status(400).send("Missing required parameters {chatId, token, message}");
        return;
    }
    messageQueue.add({ chatId, token, message });
    res.send("Message added to queue");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map