import { HttpException } from "@/exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error instanceof HttpException) {
            return res.status(error.status).json({
                success: error.success,
                data: error.data,
                message: error.message
            });
        };

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error?.message ?? "Something Went wrong!"
        })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
        })
    }
}