import { Router } from "express";
import { HealthRoutes } from "./health.routes";
import { KeycloakRoutes } from "./keycloak.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/oauth/health", HealthRoutes.routes);
    router.use("/api/oauth/keycloak", KeycloakRoutes.routes);

    return router;
  }
}
