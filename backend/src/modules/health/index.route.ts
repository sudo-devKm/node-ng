import { AppRoute } from "@/types";
import { Router } from "express";
import healthController from "./controllers/health.controller";

export class HealthRoute implements AppRoute {
    readonly router = Router();

    constructor() {
        this.setRoutes();
    };

    private readonly setRoutes = () => {
        this.router.route("/health").get(healthController.checkApplicationHealth)
    };
};