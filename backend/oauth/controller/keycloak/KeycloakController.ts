import { Request, Response } from "express";
import { LoginRequestI } from "../../models/keycloak/LoginI";
import { RegisterRequestI } from "../../models/keycloak/RegisterI";
import { KeycloakService } from "../../services/KeycloakService";

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

  private handleError(res: Response, error: any): void {
    if (error.message.includes("Unauthorized")) {
      res
        .status(401)
        .json({ message: error.message.replace("Unauthorized: ", "") });
    } else if (error.message.includes("Bad request")) {
      res
        .status(400)
        .json({ message: error.message.replace("Bad request: ", "") });
    } else if (error.message.includes("Conflict")) {
      res
        .status(409)
        .json({ message: error.message.replace("Conflict: ", "") });
    } else if (error.message.includes("Not found")) {
      res
        .status(404)
        .json({ message: error.message.replace("Not found: ", "") });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
