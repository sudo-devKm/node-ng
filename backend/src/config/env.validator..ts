import logger from "@/libs/logger";
import Joi from "joi";

export type AppEnvs = {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
};

export class EnvValidator {
    static validateEnv(env: NodeJS.ProcessEnv): AppEnvs {
        const appEnvSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test')
                .required()
                .label("NODE_ENV"),
            PORT: Joi.number()
                .port()
                .required()
                .label("PORT"),
        }).options({ abortEarly: false, allowUnknown: true });

        const { value, error } = appEnvSchema.validate(env, { abortEarly: false, allowUnknown: true });
        if (error) {
            logger.error("❌ Environment validation error:");
            error.details.forEach((detail) => {
                logger.error(`- ${detail.message}`);
            });
            process.exit(1);
        }

        return {
            NODE_ENV: value.NODE_ENV,
            PORT: value.PORT,
        };
    }
}