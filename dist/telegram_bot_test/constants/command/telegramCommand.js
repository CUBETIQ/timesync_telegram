"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandToMessageMap = exports.TelegramCommand = void 0;
class TelegramCommand {
    static getAllTelegramCommands() {
        return Object.values(TelegramCommand);
    }
}
exports.TelegramCommand = TelegramCommand;
TelegramCommand.start = "/start";
TelegramCommand.stats = "/stats";
TelegramCommand.checkin = "/checkin";
TelegramCommand.checkout = "/checkout";
TelegramCommand.askPermission = "/ask_permission";
TelegramCommand.status = "/status";
TelegramCommand.profile = "/profile";
TelegramCommand.register = "/register";
TelegramCommand.staffs = "/staffs";
TelegramCommand.export = "/export";
TelegramCommand.exportTasks = "/export_tasks";
TelegramCommand.print = "/print";
TelegramCommand.tasks = "/tasks";
TelegramCommand.tasksNew = "/tasks_new";
TelegramCommand.tasksDelete = "/tasks_delete";
TelegramCommand.info = "/info";
TelegramCommand.help = "/help";
const commandToMessageMap = {
    [TelegramCommand.start]: "Welcome to the bot",
    [TelegramCommand.stats]: "Stats",
    [TelegramCommand.checkin]: "Checkin",
    [TelegramCommand.checkout]: "Checkout",
    [TelegramCommand.askPermission]: "Ask permission",
    [TelegramCommand.status]: "Status",
    [TelegramCommand.profile]: "Profile",
    [TelegramCommand.register]: "Register",
    [TelegramCommand.staffs]: "Staffs",
    [TelegramCommand.export]: "Export",
    [TelegramCommand.exportTasks]: "Export tasks",
    [TelegramCommand.print]: "Print",
    [TelegramCommand.tasks]: "Tasks",
    [TelegramCommand.tasksNew]: "Tasks new",
    [TelegramCommand.tasksDelete]: "Tasks delete",
    [TelegramCommand.info]: "Info",
    [TelegramCommand.help]: "Help",
};
exports.commandToMessageMap = commandToMessageMap;
//# sourceMappingURL=telegramCommand.js.map