"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTelegramMessage = void 0;
const enum_1 = require("../constant/enum");
const formatTelegramMessage = (type, message) => {
    if (type == enum_1.TelegramEventType.checkIn || type == enum_1.TelegramEventType.checkOut) {
        const data = message;
        const checkInDateTime = new Date(data.checkTime);
        const dateFormatter = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
        const checkTypeDate = dateFormatter.format(checkInDateTime);
        const checkTypeTime = timeFormatter.format(checkInDateTime);
        const formatLate = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}mn`;
        };
        const name = `Name: ${data.username.charAt(0).toUpperCase() + data.username.slice(1)}`;
        const checkType = `${type == enum_1.TelegramEventType.checkIn ? "Check-in" : "Check-out"}: ${checkTypeDate} ${type == enum_1.TelegramEventType.checkIn ? "✅" : "❎"}`;
        const checkTime = `Time: ${checkTypeTime}`;
        const checkStatus = `${data.checkLate == null
            ? data.checkEarly != null
                ? `Early: ${formatLate(data.checkEarly)}  🟢\n`
                : ""
            : `Late: ${formatLate(data.checkLate)}  🔴\n`}`;
        return `${name}\n${checkType}\n${checkTime}\n${checkStatus}\nThank you!`;
    }
    else if (type == enum_1.TelegramEventType.leaveRequest) {
        const data = message;
        const name = `Name: ${data.username.charAt(0).toUpperCase() + data.username.slice(1)}`;
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };
        const from = `From: ${new Date(data.from).toLocaleString("en-US", options)}`;
        const to = `To: ${new Date(data.to).toLocaleString("en-US", options)}`;
        const formattedDurationType = data.durationType
            .replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
        const durationType = `Duration Type: ${formattedDurationType} Application 📋`;
        const reason = `Reason: ${data.reason}`;
        const createdAt = `Request Date: ${new Date(data.requestDate).toLocaleString("en-US", options)}`;
        return `Leave Request 🚩\n\n${name}\n${from}\n${to}\n${durationType}\n${reason}\n\n${createdAt}\nThank you!`;
    }
    return message;
};
exports.formatTelegramMessage = formatTelegramMessage;
//# sourceMappingURL=string_util.js.map