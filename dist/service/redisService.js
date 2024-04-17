"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedis = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../controller/index");
const app_config_1 = require("../constant/app_config");
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({ url: app_config_1.REDIS_URL });
const initRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected successfully!");
    redisClient.subscribe("attendance.created", index_1.handleRedisMessage);
};
exports.initRedis = initRedis;
//# sourceMappingURL=redisService.js.map