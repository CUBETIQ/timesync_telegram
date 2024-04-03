import express, { Express } from "express"
import cors from "cors"
import router from "./telegram/routes"
import { Telegram } from "./telegram/telegram"
import { AppConfig } from "./constants/config/app.config"

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use("/api/telegram", router)
new Telegram()

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.listen(AppConfig.PORT, () => {
  console.log(`Server is running on port ${AppConfig.PORT}`)
})
