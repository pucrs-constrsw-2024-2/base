import { Request, Response } from "express";
import { KeycloakController } from "../../controller/keycloak/KeycloakController";
import { LoginRequestI } from "../../models/keycloak/LoginI";
import { OAuthI } from "../../models/keycloak/OuthI";
import { RegisterRequestI } from "../../models/keycloak/RegisterI";
import { UserUpdatePasswordI } from "../../models/keycloak/UserI";

export class KeycloakControllerHandler {
  constructor(private readonly keycloakController: KeycloakController) {}

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: LoginRequestI = req.body;
      const response = await this.keycloakController.login(loginData);
      res.status(201).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: RegisterRequestI = req.body;
      const token =
        (req.headers.authorization as string) ||
        (req.headers["x-access-token"] as string);
      const response = await this.keycloakController.register(data, token);
      res.status(201).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers["x-access-token"] as string);
      const response = await this.keycloakController.getUsers(token);
      res.status(200).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers["x-access-token"] as string);
      const id = req.params.id;
      const response = await this.keycloakController.getUserById(id, token);
      res.status(200).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers["x-access-token"] as string);
      const id = req.params.id;
      const user = req.body;
      await this.keycloakController.updateUser(id, user, token);
      res.status(204).send();
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers["x-access-token"] as string);
      const id = req.params.id;
      await this.keycloakController.deleteUser(id, token);
      res.status(204).send();
    } catch (error: any) {
      console.log(error);
      this.handleError(res, error);
    }
  };

  updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const token =
        (req.headers.authorization as string) ||
        (req.headers["x-access-token"] as string);
      const id = req.params.id;
      const password: UserUpdatePasswordI = req.body;
      await this.keycloakController.updateUserPassword(id, password, token);
      res.status(200).send();
    } catch (error: any) {
      console.log(error);
      this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: Error): void {
    const errorObj: OAuthI = {
      error_description: error.message,
      error_source: "OAuthAPI",
      error_stack: [error?.stack] || [],
    };

    if (error.message.includes("Unauthorized")) {
      Object.assign(errorObj, {
        error_code: "401",
      });
      res.status(401).json(errorObj);
    } else if (error.message.includes("Bad request")) {
      Object.assign(errorObj, {
        error_code: "400",
      });
      res.status(400).json(errorObj);
    } else if (error.message.includes("Conflict")) {
      Object.assign(errorObj, {
        error_code: "409",
      });

      res.status(409).json(errorObj);
    } else if (error.message.includes("Not found")) {
      Object.assign(errorObj, {
        error_code: "404",
      });
      res.status(404).json(errorObj);
    } else if (error.message.includes("Internal Server Error")) {
      Object.assign(errorObj, {
        error_code: "500",
      });
      res.status(500).json(errorObj);
    } else {
      Object.assign(errorObj, {
        error_code: "500",
      });
      res.status(500).json(errorObj);
    }
  }
}
