import { ErrorOptions } from "@/types";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class HttpException extends Error {
    readonly data: Record<string, any> | null;
    readonly status: number;
    readonly success: boolean;
    readonly message: string;

    constructor(options?: ErrorOptions) {
        const { data = null, message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), status = StatusCodes.INTERNAL_SERVER_ERROR, success = false } = options ?? {};
        super(message);
        Object.setPrototypeOf(this, HttpException.prototype);
        this.message = message;
        this.data = data;
        this.status = status;
        this.success = success;
        Error.captureStackTrace(this, this.constructor);
    }
}