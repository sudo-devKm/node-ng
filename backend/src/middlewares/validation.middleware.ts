import _ from "lodash";
import type Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { SchemaValidationOptions } from "@/types"
import { NextFunction, Request, Response } from "express"

export const validationMiddleware = (options: SchemaValidationOptions) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const joiValidationResp = await Promise.allSettled(_.map(options, async ({ schema, options }, key) => {
                return schema.validateAsync<Joi.AsyncValidationOptions>(_.get(req, key), { ...options, abortEarly: false }).then((joiResponse) => {
                    _.setWith(req, key, joiResponse)
                    return joiResponse;
                }).catch((resp: Joi.ValidationError) => {
                    throw { joiResponse: resp, key };
                });
            }));

            const joiErrors = _.reduce(joiValidationResp, (errors, joiResp) => {
                if (joiResp.status === 'rejected') {
                    errors[joiResp.reason?.key!] = joiResp.reason.joiResponse.details;
                }
                return errors;
            }, <Record<string, any>>{});

            /** @info if errors has length */
            if (Object.keys(joiErrors).length) {
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                    success: false,
                    details: joiErrors,
                    message: 'Kindly Pass Valid Data'
                });
            }

            return next();
        } catch (err) {
            return next(err);
        }
    }
} 