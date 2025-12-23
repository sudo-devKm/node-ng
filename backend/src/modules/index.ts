import { AppRoute } from "@/types";
import { HealthRoute } from "./health/index.route";

export default [
    new HealthRoute()
] as AppRoute[];