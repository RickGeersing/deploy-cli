import winston, { format } from "winston";

export const logger = winston.createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.prettyPrint(),
        format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.Console(),
    ]
});