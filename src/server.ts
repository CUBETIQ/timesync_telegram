import express, { Request, Response } from "express"
import dotenv from "dotenv"
import buildInfo from "./build_info"
import { initRedis } from "./service/redisService"
import { handleMessage } from "./controller"
import { PORT } from "./constant/app_config"

const app = express()
app.use(express.json())
dotenv.config()

//////////// Health Check //////////////
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to timesync telegram!")
})

app.get("/_/health", (req: Request, res: Response) => {
  res.send("ok")
})

// TODO: We should remove this route and use the one above
app.get("/health", async (req: Request, res: Response) => {
  res.send("ok")
})

app.get("/_/info", (req: Request, res: Response) => {
  res.json(buildInfo)
})
////////////////////////////////////////

app.post("/sendMessage", handleMessage)

app.listen(PORT, async () => {
  await initRedis()
  console.log(`Server running on port ${PORT}`)
})
