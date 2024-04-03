import { Router } from "express"
import { getAllCommands, sendCommand } from "../controller/telegramController"

const router: Router = Router()

router.get("/commands", getAllCommands)
router.post("/command", sendCommand)

export default router
