import { SchemaValidationOptions } from "@/types"
import { NextFunction, Request, Response } from "express"

export const validationMiddleware = (options: SchemaValidationOptions) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err) {
            return next(err);
        }
    }
} 