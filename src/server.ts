import express, { Express } from "express"
import Queue from "bull"
import TelegramBot from "node-telegram-bot-api"
import axios from "axios"

const app = express()
const port = 3000
app.use(express.json())

const messageQueue = new Queue("message", {
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: true,
    backoff: { type: "exponential", delay: 1000 },
  },
})

// Function to handle failed jobs
const onFailed = async () => {
  try {
    const jobs = await messageQueue.getFailed()
    if (jobs.length === 0) return
    jobs.forEach(async (job) => {
      console.log("Failed job:", job.data)
      // Retry the job
      await messageQueue.add(job.data)
    })
  } catch (error) {
    console.error("Error handling failed jobs:", error)
  }
}

messageQueue.on("failed", (job, error) => {
  console.log(`Job ${job.id} failed with error: ${error.message}`)
  onFailed()
})

// Process jobs from the queue
messageQueue.process(async (job, done) => {
  // done(Error("Test error"))
  // return
  const { chatId, token, message } = job.data
  console.log("Sending message to chatId:", chatId)

  try {
    await sendMessage(chatId, token, message)
    console.log("Message sent successfully!")
    done()
  } catch (error) {
    console.error("Error sending message:", error)
    done(error)
  }
})

const sendMessage = async (chatId: string, token: string, message: string) => {
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message,
  })
  // const bot = new TelegramBot(token, { polling: true })
  // await bot.sendMessage(chatId, message)
}

app.get("/", async (req, res) => {
  res.json("Hello Word")
})

app.post("/sendMessage", async (req, res) => {
  const { chatId, token, message } = req.body
  if (!chatId || !token || !message) {
    res.status(400).send("Missing required parameters {chatId, token, message}")
    return
  }
  messageQueue.add({ chatId, token, message })
  res.send("Message added to queue")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
