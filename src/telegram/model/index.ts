export interface ISendMessageModel {
    chatId: number
    messageText: string
  }

export interface ITelegramResponseModel{
    message_id: number
    date: number
    text: string
    chat: {
        id: number
        first_name: string
        last_name: string
        username: string
        type: string
    }
    from: {
        id: number
        first_name: string
        last_name: string
        username: string
        language_code: string
    }
}