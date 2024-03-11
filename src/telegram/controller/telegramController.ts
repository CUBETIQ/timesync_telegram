import { Request, Response } from "express"
import { TelegramCommand, commandToMessageMap } from "../../constants/command/telegramCommand"
import { errorResponse, successResponse } from "../../utils/reponseUtil"
import { ISendMessageModel } from "../model"
import TelegramBot from "node-telegram-bot-api"
import { Telegram } from "../telegram"

const getAllCommands = async (req: Request, res: Response) => {
  try {
    const commands = TelegramCommand.getAllTelegramCommands()
    successResponse(res, "Commands fetched successfully", commands)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}

const sendCommand = async (req: Request, res: Response) => {
  try {
    const result: ISendMessageModel = req.body
    var msgText = result.messageText.trim()

      const responseFromTelegram = Telegram.bot.sendMessage(
        result.chatId,
        msgText,
      )
      successResponse(res, "Send command successfully", responseFromTelegram)
  } catch (error) {
    errorResponse(res, error.message)
  }
}

const msgHandler = async (value: TelegramBot.Message) => {
  const messageText =
    commandToMessageMap[value.text] || "No command found!"
    Telegram.bot.sendMessage(value.chat.id, messageText)
    //TODO: Add logic to handle the command
}

export { getAllCommands, sendCommand, msgHandler }
