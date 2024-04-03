import { AppConfig } from "../constants/config/app.config"
import TelegramBot from "node-telegram-bot-api"
import { msgHandler } from "./controller/telegramController"

class Telegram {
  static bot: TelegramBot

  constructor() {
    Telegram.bot = new TelegramBot(AppConfig.TELEGRAM_BOT_TOKEN, {
      polling: AppConfig.TELEGRAM_POLLING,
      webHook: AppConfig.TELEGRAM_WEBHOOK,
    })

    const setupWebhook = async () => {
      if (AppConfig.TELEGRAM_WEBHOOK) {
        await Telegram.bot
          .setWebHook(AppConfig.TELEGRAM_WEBHOOK_URL)
          .then(() => {
            console.log("Webhook has been set!")
          })
          .catch((err) => {
            console.error("Error setting webhook:", err)
          })
      }
    }

    setupWebhook().then(() => {
      Telegram.bot.on("message", (msg) => {
        console.log(msg)
        msgHandler(msg)
      })
    })
  }
}

export { Telegram }
