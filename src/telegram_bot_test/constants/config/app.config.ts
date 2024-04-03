import dotenv from "dotenv"

dotenv.config()

class AppConfig {
  // Server
  static readonly PORT = process.env.PORT || 3000
  static readonly APP_MODE: string = process.env.APP_MODE || "development"

  // Webhook
  static readonly WEBHOOK_URL: string = process.env.WEBHOOK_URL || ""

  // Telegram
  static readonly TELEGRAM_POLLING: boolean = process.env.TELEGRAM_POLLING === "true" || false
  static readonly TELEGRAM_WEBHOOK: boolean = process.env.TELEGRAM_WEBHOOK === "true" || false
  static readonly TELEGRAM_BOT_TOKEN: string =
    process.env.TELEGRAM_BOT_TOKEN || ""
  static readonly TELEGRAM_WEBHOOK_URL: string = process.env.TELEGRAM_WEBHOOK_URL || ""

}

export { AppConfig }
