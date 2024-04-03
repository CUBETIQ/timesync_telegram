import { Response } from "express"


const successResponse = (res: Response, message: string, data: any) => {
  const customResponse = {
    status: "success",
    message,
    data,
    timestamp: new Date().toISOString(),
  }
  res.status(200).json(customResponse)
}

const errorResponse = (res: Response, message: string) => {
  const customResponse = {
    status: "fail",
    message,
    timestamp: new Date().toISOString(),
  }
  res.status(500).json(customResponse)
}


export { successResponse ,errorResponse}
