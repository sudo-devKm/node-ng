import express, { Application } from "express";
import { AppRoute } from './types/index';
import { env } from "@/config";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middlewares/error.handler.middleware";
import logger from "@/libs/logger";

export class App {
    readonly app: Application;
    private readonly port: number;
    private readonly routes: AppRoute[] = [];

    constructor(routes: AppRoute[]) {
        this.routes = routes;
        this.port = env.PORT;
        this.app = express();
    };

    readonly start = async () => {
        // set standard middlewares.
        this.setStandardMiddlewares();
        // set routes.
        this.setRoutes();
        // set error handler middleware.
        this.setErrorHandlerMiddleware();
        // listen server.
        this.listen()
    };

    private readonly setStandardMiddlewares = () => {
        // set trust proxy
        this.app.enable('trust proxy');
        // set security headers
        this.app.use(helmet());
        // set cors
        this.app.use(cors({ credentials: true }));
        // set json parser
        this.app.use(express.json());
        // set url encoded parsing.
        this.app.use(express.urlencoded({ extended: true }));
        // set cookie-parser middleware.
        this.app.use(cookieParser());
        // set compression.
        this.app.use(compression());
        // set morgan req logger.
        this.app.use(morgan('dev', {
            stream: {
                write: (message: string) => logger.http(message.trim()),
            }
        }));
    };

    private readonly setRoutes = () => {
        this.routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    };

    private readonly setErrorHandlerMiddleware = () => {
        // set Error Handler middleware.
        this.app.use(errorHandlerMiddleware);
    };

    private readonly listen = () => {
        this.app.listen(this.port, () => {
            logger.info("==================================");
            logger.info(`== App is listening on port ${this.port} =`);
            logger.info("==================================");
        })
    };
};