"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const axiosService_1 = require("./axiosService");
const messageQueue = new bull_1.default("message", process.env.REDIS_URL, {
    defaultJobOptions: {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
        backoff: { type: "exponential", delay: 1000 },
    },
});
exports.messageQueue = messageQueue;
messageQueue.process(async (job, done) => {
    const { chatId, token, myMessage } = job.data;
    console.log("Sending message to chatId:", chatId);
    try {
        await (0, axiosService_1.sendMessage)(chatId, token, myMessage);
        console.log("Message sent successfully!");
        done();
    }
    catch (error) {
        console.error("Error sending message:", error);
        done(error);
    }
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
//# sourceMappingURL=bullService.js.map