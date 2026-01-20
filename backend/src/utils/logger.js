import chalk from "chalk"

const levels = {
    info: chalk.blue,
    silly: chalk.white,
    error: chalk.red,
    warning: chalk.yellow,
    success: chalk.green,
    debug: chalk.magenta
};

function log(level, message, ...args) {
    const color = levels[level] || ((text) => text);
    const timestamp = new Date().toISOString();
    console.log(color(`[${timestamp}] [${level.toUpperCase()}] ${message}`), ...args);
}


const logger = {
    info: (msg, ...args) => log("info", msg, ...args),
    silly: (msg, ...args) => log("silly", msg, ...args),
    error: (msg, ...args) => log("error", msg, ...args),
    warning: (msg, ...args) => log("warning", msg, ...args),
    success: (msg, ...args) => log("success", msg, ...args),
};

export { logger };
