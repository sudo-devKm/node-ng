import { sendResponse } from "@/helpers/common.helper";
import { NextFunction, Request, Response } from "express";

class HealthController {

    constructor() {
        /** */
    };

    readonly checkApplicationHealth = (req: Request, res: Response, next: NextFunction) => {
        try {
            return sendResponse({
                res,
                success: true,
                message: 'Health Checked Successfully'
            })
        } catch (err) {
            return next(err);
        }
    }
};

export default new HealthController();