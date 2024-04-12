import { createClient } from "redis";
import dotenv from "dotenv";
import { handleRedisMessage } from "../controller/index";

dotenv.config();

const redisClient = createClient({ url: process.env.REDIS_URL });

const initRedis = async () => {
  await redisClient.connect();
  console.log("Redis connected successfully!");

  redisClient.subscribe("attendance.created", handleRedisMessage);
};

export { initRedis };
