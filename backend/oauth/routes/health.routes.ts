import { Router } from "express";
import { HealthControllerFactory } from "../controller/health/HealthControllerFactory";
import { ControllerHandler } from "../utils/ControllerHandler";

export class HealthRoutes {
  static get routes(): Router {
    const router = Router();
    const healthController = HealthControllerFactory.create();

    router.get(
      "/",
      ControllerHandler.handle(
        healthController.getHealth.bind(healthController)
      )
    );

    return router;
  }
}
