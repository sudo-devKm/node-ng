import { App } from "@/app";
import Routes from "@/modules"
import logger from "@/libs/logger";

const bootstrap = async () => {
    const application = new App(Routes);
    await application.start()
};

bootstrap().catch((error) => {
    logger.error("Something broke!", error);
});