import { NextFunction, Request, Response } from "express";
import { KeycloakRestFactory } from "../rest/KeycloakRestFactory";

const keycloakRest = KeycloakRestFactory.create();

export class AuthMiddleware {
  static validateBearerToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token inválido" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const isValid = await keycloakRest.validateToken(token);

      if (!isValid) {
        return res.status(401).json({ message: "Access token inválido" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static authorizeRoles = (allowedRoles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token inválido" });
      }

      const token = authHeader.split(" ")[1];
      const payload = keycloakRest.decodeToken(token);

      if (!payload.resource_access["realm-management"]) {
        return res.status(403).json({
          message:
            "Access token não concede permissão para acessar esse endpoint",
        });
      }

      const userRoles = payload.resource_access["realm-management"].roles;

      const hasPermission = allowedRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasPermission) {
        return res.status(403).json({
          message:
            "Access token não concede permissão para acessar esse endpoint",
        });
      }

      next();
    };
  };
}
