import { SendResponseOptions } from "@/types";
import { StatusCodes } from "http-status-codes";

export const sendResponse = (options: SendResponseOptions) => {
    const { res, data = null, message, status = StatusCodes.OK, success = true } = options;
    return res.status(status).json({
        message,
        data,
        success
    })
}