import { LoginRequestI, LoginResponseI } from "../models/keycloak/LoginI";
import { RegisterRequestI } from "../models/keycloak/RegisterI";
import { UserI, UserUpdateI, UserUpdatePasswordI } from "../models/keycloak/UserI";
import { KeycloakRest } from "../rest/KeycloakRest";
import { KeycloakUtils } from "../utils/KeycloakUtils";

export class KeycloakService {
  constructor(
    private readonly keycloakRest: KeycloakRest,
    private readonly keycloakUtils: KeycloakUtils
  ) {}

  login = async (data: LoginRequestI): Promise<LoginResponseI> => {
    this.keycloakUtils.validateLoginRequest(data);

    const loginData = this.keycloakUtils.buildLoginData(data);
    return await this.keycloakRest.login(loginData);
  };

  getUsers = async (token: string): Promise<UserI[]> => {
    const response = await this.keycloakRest.getUsers(token);

    return response.map((user: any) => {
      return this.keycloakUtils.convertUser(user);
    });
  };

  getUserById = async (id: string, token: string): Promise<UserI> => {
    const response = await this.keycloakRest.getUserById(id, token);
    return this.keycloakUtils.convertUser(response);
  };

  updateUser = async (
    id: string,
    user: UserUpdateI,
    token: string
  ): Promise<void> => {
    const formattedUser = this.keycloakUtils.buildUpdateUser(user);
    await this.keycloakRest.updateUser(id, formattedUser, token);
  };

  registerUser = async (
    data: RegisterRequestI,
    token: string
  ): Promise<UserI> => {
    this.keycloakUtils.validateRegisterUserRequest(data);

    const registerData = this.keycloakUtils.buildRegisterData(data);
    const id = await this.keycloakRest.register(registerData, token);
    const formattedId = id.split("/").pop() as string;

    return this.keycloakUtils.convertUser(registerData, formattedId);
  };

  deleteUser = async (
    id: string,
    token: string
  ): Promise<void> => {
    return await this.keycloakRest.deleteUser(id, token);
  };

  updateUserPassword = async (
    id: string,
    data: UserUpdatePasswordI,
    token: string
  ): Promise<void> => {
    const formattedData = this.keycloakUtils.convertPassword(data.password);
    return await this.keycloakRest.updateUserPassword(id, formattedData, token);
  };
}
