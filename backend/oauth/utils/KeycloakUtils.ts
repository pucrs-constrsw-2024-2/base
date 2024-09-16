import { envs } from "../config/env";
import {
  LoginRequestI,
  LoginRequestKeycloakI,
} from "../models/keycloak/LoginI";
import {
  RegisterRequestI,
  RegisterRequestKeycloakI,
} from "../models/keycloak/RegisterI";
import { UserUpdateI, UserUpdateKeycloakI } from "../models/keycloak/UserI";

export class KeycloakUtils {
  validateLoginRequest(data: LoginRequestI): void {
    let camposFaltantes: string[] = [];

    if (!data.username) {
      camposFaltantes.push("username");
    }

    if (!data.password) {
      camposFaltantes.push("password");
    }

    if (camposFaltantes.length > 0) {
      throw new Error(
        `Bad request: Informe os campos obrigatórios: ${camposFaltantes.join(
          ", "
        )}`
      );
    }
  }

  buildUpdateUser = (user: UserUpdateI): UserUpdateKeycloakI => {
    const data: any = {};

    if (user.username) {
      data["username"] = user.username;
    }

    if (user.first_name) {
      data["firstName"] = user.first_name;
    }

    if (user.last_name) {
      data["lastName"] = user.last_name;
    }

    return data;
  };

  buildLoginData(data: LoginRequestI): LoginRequestKeycloakI {
    return {
      username: data.username,
      password: data.password,
      grant_type: "password",
      client_id: "oauth",
      client_secret: envs.KEYCLOAK_CLIENT_SECRET,
    };
  }

  convertUser(user: any, id?: any): any {
    return {
      id: id || user.id,
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName,
      enabled: user.enabled,
    };
  }

  convertPassword(password: string): any {
    return {
      type: "password",
      value: password,
      temporary: false,
    };
  }

  validateRegisterUserRequest(data: RegisterRequestI): void {
    let camposFaltantes: string[] = [];

    if (!data.password) {
      camposFaltantes.push("password");
    }

    if (!data.first_name) {
      camposFaltantes.push("first_name");
    }

    if (!data.last_name) {
      camposFaltantes.push("last_name");
    }

    if (camposFaltantes.length > 0) {
      throw new Error(
        `Bad request: Informe os campos obrigatórios: ${camposFaltantes.join(
          ", "
        )}`
      );
    }
  }

  buildRegisterData(data: RegisterRequestI): RegisterRequestKeycloakI {
    return {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: data.password,
        },
      ],
    };
  }
}
