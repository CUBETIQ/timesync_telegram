import { formatTelegramMessage } from "../util/string_util"
import { TelegramMessageModel } from "../model/model"
import { messageQueue } from "../service/bullService"
import { Request, Response } from "express"

const handleMessage = async (req: Request, res: Response) => {
  const { chatId, token, message } = req.body

  if (!chatId || !token || !message) {
    res.status(400).send("Missing required parameters {chatId, token, message}")
    return
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
    const { chatId, token } = telegram

    if (!chatId || !token || !message) {
      console.error(
        "Required properties (chatId, token, message) are missing in the data",
      )
      return
    }

    const myMessage = formatTelegramMessage(eventData.type, message)
    await messageQueue.add({ chatId, token, myMessage })
  } catch (error) {
    console.error("Error processing attendance data:", error.message)
  }
}

export { handleMessage, handleRedisMessage }
