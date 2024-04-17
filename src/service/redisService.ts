import { createClient } from "redis"
import dotenv from "dotenv"
import { handleRedisMessage } from "../controller/index"
import { REDIS_LOCAL, REDIS_URL } from "../constant/app_config"

dotenv.config()

const redisClient = createClient({ url: REDIS_URL })

const initRedis = async () => {
  try {
    await redisClient.connect()
    console.log("Redis connected successfully!")
  } catch (error) {
    redisClient.quit()
    redisClient.options.url = REDIS_LOCAL
    await redisClient.connect()
    console.log("Connected to Redis using default URL")
  }

  redisClient.subscribe("attendance.created", handleRedisMessage)
}

export { initRedis }