import type { Response, Router } from "express"
import type Joi from "joi";

export type AppRoute = {
    readonly router: Router
    readonly path?: string
};

export type SendResponseOptions = {
    res: Response,
    data?: Record<string, any>
    status?: number;
    message?: string;
    success?: boolean
};

export type ErrorOptions = {
    data?: Record<string, any>;
    message?: string;
    status?: number;
    success?: boolean;
}

export type SchemaValidationOptions = {
    [key: string]: { schema: Joi.Schema, options?: Joi.AsyncValidationOptions }
}