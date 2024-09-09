import { Router } from "express";
import { HealthRoutes } from "./health.routes";
import { KeycloakRoutes } from "./keycloak.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/health", HealthRoutes.routes);
    router.use("/api/v1/keycloak", KeycloakRoutes.routes);

    return router;
  }
}
