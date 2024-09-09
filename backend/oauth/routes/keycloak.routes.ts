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

    router.patch("/users/:id", (req: any, res: any) => {
      res.send("Atualiza a senha de um usuário");
    });

    router.delete("/users/:id", (req: any, res: any) => {
      res.send("Deleta um usuário");
    });

    router.post(
      "/users",
      AuthMiddleware.validateBearerToken,
      AuthMiddleware.authorizeRoles(["manage-users"]),
      keycloakController.register
    );

    return router;
  }
}
