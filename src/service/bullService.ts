import Queue from "bull"
import { sendMessage } from "./axiosService"

const messageQueue = new Queue("message", process.env.REDIS_URL, {
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: true,
    backoff: { type: "exponential", delay: 1000 },
  },
})

messageQueue.process(async (job, done) => {
  const { chatId, token, myMessage } = job.data
  console.log("Sending message to chatId:", chatId)
  try {
    await sendMessage(chatId, token, myMessage)
    console.log("Message sent successfully!")
    done()
  } catch (error) {
    console.error("Error sending message:", error)
    done(error)
  }
})

// messageQueue.on("failed", (job, error) => {
//   console.log(`Job ${job.id} failed with error: ${error.message}`)
//   onFailed()
// })

const onFailed = async () => {
  try {
    const jobs = await messageQueue.getFailed()
    if (jobs.length === 0) return
    jobs.forEach(async (job) => {
      console.log("Failed job:", job.data)
      await messageQueue.add(job.data)
    })
  } catch (error) {
    console.error("Error handling failed jobs:", error)
  }
}

export { messageQueue }
