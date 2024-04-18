import { formatTelegramMessage } from "../util/string_util"
import { TelegramMessageModel } from "../model/model"
import { messageQueue } from "../service/bullService"
import { Request, Response } from "express"
import {
  TELEGRAM_DEFAULT_CHATID,
  TELEGRAM_DEFAULT_TOKEN,
} from "@/constant/app_config"

const handleMessage = async (req: Request, res: Response) => {
  let { chatId, token, message } = req.body

  if (!chatId || !token) {
    console.error("Missing required parameters {chatId, token")
    chatId = TELEGRAM_DEFAULT_CHATID
    token = TELEGRAM_DEFAULT_TOKEN
  }
  const myMessage = message
  messageQueue.add({ chatId, token, myMessage })
  res.send("Message added to queue")
}

const handleRedisMessage = async (data?: string | null) => {
  try {
    console.log("Attendance created:", data)

    const eventData: TelegramMessageModel = {
      ...JSON.parse(data),
    }

    const { telegram, data: message } = eventData
    let { chatId, token } = telegram

    if (!chatId || !token) {
      console.error(
        "Required properties (chatId, token) are missing in the data",
      )
      chatId = TELEGRAM_DEFAULT_CHATID
      token = TELEGRAM_DEFAULT_TOKEN
    }

    const myMessage = formatTelegramMessage(eventData.type, message)
    await messageQueue.add({ chatId, token, myMessage })
  } catch (error) {
    console.error("Error processing attendance data:", error.message)
  }
}

export { handleMessage, handleRedisMessage }
