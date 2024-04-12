import axios from "axios"

const sendMessage = async (chatId: string, token: string, message: string) => {
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message ?? "",
  })
}

export { sendMessage }
