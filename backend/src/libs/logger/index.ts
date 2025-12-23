import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, json, printf, errors, timestamp, colorize } = winston.format;

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
    return `${timestamp} [${level}] ${message} ${Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ""}`;
});

const dailyRotateFile = (level: string) =>
    new DailyRotateFile({
        level,
        datePattern: "YYYY-MM-DD",
        maxFiles: "14d",
        maxSize: "20m",
        filename: `logs/${level}/%DATE%.log`,
        auditFile: `logs/${level}/${level}-audit.json`,
        zippedArchive: true,
    });

const createLogger = () =>
    winston.createLogger({
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
        format: combine(
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            errors({ stack: true }),
            process.env.NODE_ENV === "production" ? json() : devFormat
        ),
        transports: [
            dailyRotateFile("info"),
            dailyRotateFile("error"),
        ],
        exitOnError: false,
    });

const logger = createLogger();

if (process.env.NODE_ENV === "development") {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: "HH:mm:ss" }),
                devFormat
            ),
        })
    );
}

export default logger;