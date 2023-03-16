const respawn = require("respawn");
const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ colorize: false })
    ]
});

const monitor = respawn(["node", "bin/www"], {
    cwd: ".",
    maxRestarts: 100,
    sleep: n => Math.min((1 << (n / 2)) * 1000, 60 * 10 * 1000)
});

monitor.on("stdout", data => {
    logger.info(data.toString());
});

monitor.on("stderr", data => {
    logger.error(data.toString());
});

monitor.start();
