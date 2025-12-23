import { config } from 'dotenv';
import { EnvValidator } from './env.validator.';

config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

export const env = EnvValidator.validateEnv(process.env);