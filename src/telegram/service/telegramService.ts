import axios from "axios"
import { AppConfig } from "../../constants/config/app.config"
import {ITelegramResponseModel } from "../model"

class TelegramService {

  static postToWebhook = async (data: ITelegramResponseModel) => {
    try {
      const webhookUrl = AppConfig.WEBHOOK_URL
      await axios.post(webhookUrl, data)
    } catch (error) {
    }
  }

}
export { TelegramService }
