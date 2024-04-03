"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const telegramController_1 = require("../controller/telegramController");
const router = (0, express_1.Router)();
router.get("/commands", telegramController_1.getAllCommands);
router.post("/command", telegramController_1.sendCommand);
exports.default = router;
//# sourceMappingURL=index.js.map