class TelegramCommand {
  static readonly start = "/start"
  static readonly stats = "/stats"
  static readonly checkin = "/checkin"
  static readonly checkout = "/checkout"
  static readonly askPermission = "/ask_permission"
  static readonly status = "/status"
  static readonly profile = "/profile"
  static readonly register = "/register"
  static readonly staffs = "/staffs"
  static readonly export = "/export"
  static readonly exportTasks = "/export_tasks"
  static readonly print = "/print"
  static readonly tasks = "/tasks"
  static readonly tasksNew = "/tasks_new"
  static readonly tasksDelete = "/tasks_delete"
  static readonly info = "/info"
  static readonly help = "/help"

  static getAllTelegramCommands() {
    return Object.values(TelegramCommand)
  }



}

const commandToMessageMap: Record<any, string> = {
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
}

export { TelegramCommand,commandToMessageMap }
