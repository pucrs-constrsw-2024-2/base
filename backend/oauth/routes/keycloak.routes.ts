import { Router } from "express";
import { KeycloakControllerFactory } from "../controller/keycloak/KeycloakControllerFactory";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export class KeycloakRoutes {
  static get routes(): Router {
    const router = Router();
    const keycloakController = new KeycloakControllerFactory().create();

    router.post("/login", keycloakController.login);

    router.get(
      "/users",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["view-users"]),
      keycloakController.getUsers
    );

    router.get(
      "/users/:id",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["view-users"]),
      keycloakController.getUserById
    );

    router.put(
      "/users/:id",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakController.updateUser
    );

    router.delete("/users/:id", 
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["delete-account"]),
      keycloakController.deleteUser
    );

    router.patch("/users/:id", 
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakController.updateUserPassword
    );

    router.post(
      "/users",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakController.register
    );

    return router;
  }
}
