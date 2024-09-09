import { Router } from "express";
import { HealthControllerFactory } from "../controller/health/HealthControllerFactory";

export class HealthRoutes {
  static get routes(): Router {
    const router = Router();
    const healthController = new HealthControllerFactory().create();

    router.get("/", healthController.getHealth);

    return router;
  }
}
