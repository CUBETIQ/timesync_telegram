import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000

export const REDIS_URL = process.env.REDIS_URL || "redis://192.168.3.116:6379"

export const TELEGRAM_DEFAULT_CHATID= process.env.TELEGRAM_DEFAULT_CHATID
export const TELEGRAM_DEFAULT_TOKEN= process.env.TELEGRAM_DEFAULT_TOKEN