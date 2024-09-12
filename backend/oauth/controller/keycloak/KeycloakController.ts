import { Request, Response } from "express";
import { LoginRequestI } from "../../models/keycloak/LoginI";
import { RegisterRequestI } from "../../models/keycloak/RegisterI";
import { KeycloakService } from "../../services/KeycloakService";
import { OAuthI } from "../../models/keycloak/OuthI";
import { UserUpdatePasswordI } from "../../models/keycloak/UserI";

export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: LoginRequestI = req.body;
      const response = await this.keycloakService.login(loginData);
      res.status(201).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const registerData: RegisterRequestI = req.body;
      const authHeader = req.headers.authorization as string;
      const response = await this.keycloakService.registerUser(
        registerData,
        authHeader
      );
      res.status(201).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const response = await this.keycloakService.getUsers(token);
      res.status(200).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;
      const response = await this.keycloakService.getUserById(id, token);
      res.status(200).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;
      const user = req.body;
      await this.keycloakService.updateUser(id, user, token);
      res.status(204).send();
    } catch (error: any) {
      this.handleError(res, error);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;
      await this.keycloakService.deleteUser(id, token);
      res.status(204).send();
    } catch (error: any) {
      console.log(error)
      this.handleError(res, error);
    }
  }

  // validar body com o campo password
  updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;
      const password: UserUpdatePasswordI = req.body;
      await this.keycloakService.updateUserPassword(id, password, token);
      res.status(200).send();
    } catch (error: any) {
      console.log(error)
      this.handleError(res, error);
    }
  }

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
    } else {
      Object.assign(errorObj, {
        error_code: "500",
      });
      res.status(500).json(errorObj);
    }
  }
}
