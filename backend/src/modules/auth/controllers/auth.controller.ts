import { NextFunction, Request, Response } from "express";

class AuthController {
    constructor() { };

    // Register User.
    readonly register = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (err) {
            return next(err);
        }
    }
};

export default new AuthController();