import { Redis } from "ioredis"

const redis = new Redis({
  port: Number(process.env.REDIS_PORT) || 0,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
})

redis.connect(() => console.log("Redis connected"))
module.exports = redis
