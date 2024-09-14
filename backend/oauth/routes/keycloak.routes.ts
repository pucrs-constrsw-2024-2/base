import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { KeycloakControllerHandlerFactory } from "../handler/keycloak/KeycloakControllerHandlerFactory";

export class KeycloakRoutes {
  static get routes(): Router {
    const router = Router();
    const keycloakHandler = KeycloakControllerHandlerFactory.create();

    router.post("/login", keycloakHandler.login);

    router.get(
      "/users",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["view-users"]),
      keycloakHandler.getUsers
    );

    router.post(
      "/users",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakHandler.register
    );

    router.get(
      "/users/:id",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["view-users"]),
      keycloakHandler.getUserById
    );

    router.put(
      "/users/:id",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakHandler.updateUser
    );

    router.delete(
      "/users/:id",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["delete-account"]),
      keycloakHandler.deleteUser
    );

    router.patch(
      "/users/:id",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakHandler.updateUserPassword
    );

    return router;
  }
}
