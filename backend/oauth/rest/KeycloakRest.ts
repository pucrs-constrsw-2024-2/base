import { HttpAdapter } from "../adapters/HttpAdapter";
import { JwtAdapter } from "../adapters/JwtAdapter";
import { envs } from "../config/env";
import {
  LoginRequestKeycloakI,
  LoginResponseI,
} from "../models/keycloak/LoginI";
import { RegisterRequestKeycloakI } from "../models/keycloak/RegisterI";
import { UserUpdatePasswordI } from "../models/keycloak/UserI";

export class KeycloakRest {
  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly JwtAdapter: JwtAdapter
  ) {}

  login = async (data: LoginRequestKeycloakI): Promise<LoginResponseI> => {
    try {
      const response = await this.httpAdapter.post(
        `${envs.KEYCLOAK_URL}/realms/${envs.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams(Object.entries(data))
      );

      return this.mapToLoginResponse(response.data);
    } catch (error: any) {
      this.handleError(error);
      return {} as LoginResponseI;
    }
  };

  register = async (
    data: RegisterRequestKeycloakI,
    token: String
  ): Promise<string> => {
    try {
      const response = await this.httpAdapter.post(
        `${envs.KEYCLOAK_URL}/admin/realms/${envs.KEYCLOAK_REALM}/users`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.headers.location as string;
    } catch (error: any) {
      this.handleError(error);
      return "";
    }
  };

  getUsers = async (token: string): Promise<any> => {
    try {
      const response = await this.httpAdapter.get(
        `${envs.KEYCLOAK_URL}/admin/realms/${envs.KEYCLOAK_REALM}/users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
      return [];
    }
  };

  getUserById = async (id: string, token: string): Promise<any> => {
    try {
      const response = await this.httpAdapter.get(
        `${envs.KEYCLOAK_URL}/admin/realms/${envs.KEYCLOAK_REALM}/users/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
      return [];
    }
  };

  updateUser = async (id: string, data: any, token: string): Promise<void> => {
    try {
      await this.httpAdapter.put(
        `${envs.KEYCLOAK_URL}/admin/realms/${envs.KEYCLOAK_REALM}/users/${id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      this.handleError(error);
    }
  };

  deleteUser = async (id: string, token: string) => {
    try {
      await this.httpAdapter.delete(
        `${envs.KEYCLOAK_URL}/admin/realms/${envs.KEYCLOAK_REALM}/users/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      this.handleError(error);
    }
  };

  updateUserPassword = async (id: string, password: any, token: string) => {
    try {
      await this.httpAdapter.put(
        `${envs.KEYCLOAK_URL}/admin/realms/${envs.KEYCLOAK_REALM}/users/${id}/reset-password`,
        password,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      this.handleError(error);
    }
  };


  validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await this.httpAdapter.post(
        `${envs.KEYCLOAK_URL}/realms/${envs.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        new URLSearchParams({
          token,
          client_id: envs.KEYCLOAK_CLIENT_ID,
          client_secret: envs.KEYCLOAK_CLIENT_SECRET,
        })
      );

      return response.data.active;
    } catch (error: any) {
      this.handleError(error);
      return false;
    }
  };

  decodeToken = (token: string): any => {
    return this.JwtAdapter.decode(token);
  };

  private handleError(error: any): void {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized: Usuário ou senha inválidos");
    } else if (error.response?.status === 409) {
      throw new Error("Conflict: Username já existente");
    } else if (error.response?.status === 404) {
      throw new Error("Not found: Usuário não encontrado");
    } else {
      throw new Error(
        "Internal Server Error: Erro ao comunicar com o endpoint externo"
      );
    }
  }

  private mapToLoginResponse(data: any): LoginResponseI {
    return {
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
      refresh_expires_in: data.refresh_expires_in,
    };
  }
}
