import { TelegramEventType } from "../constant/enum"

export interface TelegramMessageModel {
  id: string
  type: string
  telegram: {
    chatId: string
    token: string
  }
  data: any
}

export interface CheckInOutModel {
  username: string
  checkTime: number
  checkLate: number | null
  checkEarly: number
}

export interface LeaveRequestModel {
  username: string
  requestDate: number
  from: number
  to: number
  durationType: string
  reason: string
}


