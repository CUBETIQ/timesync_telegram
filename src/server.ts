import express from "express"
import dotenv from "dotenv"
import { initRedis } from "./service/redisService"
import { handleMessage } from "./controller"
import { PORT } from "./constant/app_config"

const app = express()
app.use(express.json())
dotenv.config()

app.post("/sendMessage", handleMessage)

app.listen(PORT, async () => {
  await initRedis()
  console.log(`Server running on port ${PORT}`)
})
