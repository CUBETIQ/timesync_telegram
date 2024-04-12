import { CheckInOutModel, LeaveRequestModel } from "../model/model"
import { TelegramEventType } from "../constant/enum"

export const formatTelegramMessage = (type: string, message: any): string => {
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const formatDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
    return new Date(date).toLocaleString("en-US", options)
  }

  if (type === TelegramEventType.checkIn || type === TelegramEventType.checkOut) {
    const data: CheckInOutModel = message
    const checkTime = new Date(data.checkTime)
    const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    const timeFormatter = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    const checkTypeDate = dateFormatter.format(checkTime)
    const checkTypeTime = timeFormatter.format(checkTime)

    const formatLate = (minutes: number): string => {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return `${hours}h ${remainingMinutes}mn`
    }

    const name = `Name: ${capitalizeFirstLetter(data.username)}`
    const checkType = `${type === TelegramEventType.checkIn ? "Check-in" : "Check-out"}: ${checkTypeDate} ${type === TelegramEventType.checkIn ? "⌛" : "🚀"}`
    const checkStatus = data.checkLate == null ? data.checkEarly != null ? `Early: ${formatLate(data.checkEarly)}  🟢\n` : "" : `Late: ${formatLate(data.checkLate)}  🔴\n`

    return `${name}\n${checkType}\nTime: ${checkTypeTime}\n${checkStatus}\nThank you!`
  } else if (type === TelegramEventType.leaveRequest) {
    const data: LeaveRequestModel = message
    const name = `Name: ${capitalizeFirstLetter(data.username)}`
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }
    const from = `From: ${formatDate(new Date(data.from), options)}`
    const to = `To: ${formatDate(new Date(data.to), options)}`
    const formattedDurationType = data.durationType.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    const durationType = `Duration Type: ${formattedDurationType} Application 📋`
    const reason = `Reason: ${data.reason}`
    const createdAt = `Request Date: ${formatDate(new Date(data.requestDate), options)}`
    return `Leave Request 🚩\n\n${name}\n${from}\n${to}\n${durationType}\n${reason}\n\n${createdAt}\nThank you!`
  }

  return message
}
