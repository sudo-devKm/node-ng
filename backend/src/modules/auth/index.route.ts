import { AppRoute } from "@/types";
import { Router } from "express";

export class AuthRoute implements AppRoute {
    readonly router = Router();

    constructor() {
        this.setAuthRoutes();
    };

    private readonly setAuthRoutes = () => {
        // Register 
        this.router
            .route("/register")
            .post()
    };
};