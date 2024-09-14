import { LoginRequestI, LoginResponseI } from "../../models/keycloak/LoginI";
import { RegisterRequestI } from "../../models/keycloak/RegisterI";
import { KeycloakService } from "../../services/KeycloakService";
import { OAuthI } from "../../models/keycloak/OuthI";
import {
  UserI,
  UserUpdateI,
  UserUpdatePasswordI,
} from "../../models/keycloak/UserI";
import {
  Body,
  Get,
  Header,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Path,
  Put,
  Delete,
  Patch,
} from "tsoa";

@Tags("Keycloak")
@Route("keycloak")
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  /**
   * Realiza o login de um usuário usando as credenciais informadas.
   *
   * @param data
   * @returns LoginResponseI
   */
  @Post("login")
  @Response<OAuthI>(400, "Bad request", {
    error_code: "400",
    error_description: "Bad request",
    error_source:
      "Bad request: Informe os campos obrigatórios: username, password",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @Response<OAuthI>(409, "Conflict", {
    error_code: "409",
    error_description: "Conflict",
    error_source: "Conflict: Username já existente",
    error_stack: [],
  })
  @Response<OAuthI>(404, "Not found", {
    error_code: "404",
    error_description: "Not found",
    error_source: "Not found: Usuário não encontrado",
    error_stack: [],
  })
  @Response<LoginResponseI>(200, "Success", {
    access_token: "string",
    refresh_token: "string",
    expires_in: 0,
    token_type: "string",
    refresh_expires_in: 0,
  })
  async login(@Body() data: LoginRequestI): Promise<LoginResponseI> {
    const response = await this.keycloakService.login(data);
    return response;
  }

  /**
   * Realiza o cadastro de um novo usuário.
   *
   * @param data Dados do usuário
   * @param token Token de autenticação
   * @returns UserI
   */
  @Post("users")
  @Response<OAuthI>(401, "Unauthorized", {
    error_code: "401",
    error_description: "Unauthorized",
    error_source: "Unauthorized: Access token inválido",
    error_stack: [],
  })
  @Response<OAuthI>(403, "Forbidden", {
    error_code: "401",
    error_description: "Forbidden",
    error_source:
      "Forbidden: Access token não concede permissão para acessar esse endpoint",
    error_stack: [],
  })
  @Response<OAuthI>(400, "Bad request", {
    error_code: "400",
    error_description: "Bad request",
    error_source:
      "Bad request: Informe os campos obrigatórios: first_name, last_name, password",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @Response<OAuthI>(409, "Conflict", {
    error_code: "409",
    error_description: "Conflict",
    error_source: "Conflict: Username já existente",
    error_stack: [],
  })
  @Response<UserI>(201, "Created", {
    id: "string",
    username: "string",
    first_name: "string",
    last_name: "string",
    enabled: true,
  })
  @SuccessResponse("201", "Created")
  async register(
    @Body() data: RegisterRequestI,
    @Header("X-Access-Token") token: string
  ): Promise<UserI> {
    const response = await this.keycloakService.registerUser(data, token);
    return response;
  }

  /**
   * Retorna uma lista de todos os usuários cadastrados.
   *
   * @param token Token de autenticação
   * @returns UserI[]
   */
  @Get("/users")
  @Response<OAuthI>(401, "Unauthorized", {
    error_code: "401",
    error_description: "Unauthorized",
    error_source: "Unauthorized: Access token inválido",
    error_stack: [],
  })
  @Response<OAuthI>(403, "Forbidden", {
    error_code: "401",
    error_description: "Forbidden",
    error_source:
      "Forbidden: Access token não concede permissão para acessar esse endpoint",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @Response<UserI[]>(200, "Success", [
    {
      id: "string",
      username: "string",
      first_name: "string",
      last_name: "string",
      enabled: true,
    },
  ])
  async getUsers(@Header("X-Access-Token") token: string): Promise<UserI[]> {
    const response = await this.keycloakService.getUsers(token);
    return response;
  }

  /**
   * Retorna um usuário pelo ID.
   *
   * @param token Token de autenticação
   * @returns UserI
   */
  @Get("/users/{id}")
  @Response<OAuthI>(401, "Unauthorized", {
    error_code: "401",
    error_description: "Unauthorized",
    error_source: "Unauthorized: Access token inválido",
    error_stack: [],
  })
  @Response<OAuthI>(403, "Forbidden", {
    error_code: "401",
    error_description: "Forbidden",
    error_source:
      "Forbidden: Access token não concede permissão para acessar esse endpoint",
    error_stack: [],
  })
  @Response<OAuthI>(404, "Not found", {
    error_code: "404",
    error_description: "Not found",
    error_source: "Not found: Usuário não encontrado",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @Response<UserI>(200, "Success", {
    id: "string",
    username: "string",
    first_name: "string",
    last_name: "string",
    enabled: true,
  })
  async getUserById(
    @Path() id: string,
    @Header("X-Access-Token") token: string
  ): Promise<UserI> {
    const response = await this.keycloakService.getUserById(id, token);
    return response;
  }

  /**
   * Atualiza um usuário pelo ID.
   *
   * @param id ID do usuário
   * @param user Dados do usuário
   * @param token Token de autenticação
   */
  @Put("/users/{id}")
  @Response<OAuthI>(401, "Unauthorized", {
    error_code: "401",
    error_description: "Unauthorized",
    error_source: "Unauthorized: Access token inválido",
    error_stack: [],
  })
  @Response<OAuthI>(403, "Forbidden", {
    error_code: "401",
    error_description: "Forbidden",
    error_source:
      "Forbidden: Access token não concede permissão para acessar esse endpoint",
    error_stack: [],
  })
  @Response<OAuthI>(404, "Not found", {
    error_code: "404",
    error_description: "Not found",
    error_source: "Not found: Usuário não encontrado",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @SuccessResponse("204", "No content")
  async updateUser(
    @Path() id: string,
    @Body() user: UserUpdateI,
    @Header("X-Access-Token") token: string
  ): Promise<void> {
    await this.keycloakService.updateUser(id, user, token);
  }

  /**
   * Deleta um usuário pelo ID.
   *
   * @param id ID do usuário
   * @param token Token de autenticação
   */
  @Delete("/users/{id}")
  @Response<OAuthI>(401, "Unauthorized", {
    error_code: "401",
    error_description: "Unauthorized",
    error_source: "Unauthorized: Access token inválido",
    error_stack: [],
  })
  @Response<OAuthI>(403, "Forbidden", {
    error_code: "401",
    error_description: "Forbidden",
    error_source:
      "Forbidden: Access token não concede permissão para acessar esse endpoint",
    error_stack: [],
  })
  @Response<OAuthI>(404, "Not found", {
    error_code: "404",
    error_description: "Not found",
    error_source: "Not found: Usuário não encontrado",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @SuccessResponse("204", "No content")
  async deleteUser(
    @Path() id: string,
    @Header("X-Access-Token") token: string
  ): Promise<void> {
    await this.keycloakService.deleteUser(id, token);
  }

  /**
   * Altera a senha de um usuário pelo ID.
   *
   * @param id ID do usuário
   * @param password Nova senha
   * @param token Token de autenticação
   */
  @Patch("users/{id}")
  @Response<OAuthI>(401, "Unauthorized", {
    error_code: "401",
    error_description: "Unauthorized",
    error_source: "Unauthorized: Access token inválido",
    error_stack: [],
  })
  @Response<OAuthI>(403, "Forbidden", {
    error_code: "401",
    error_description: "Forbidden",
    error_source:
      "Forbidden: Access token não concede permissão para acessar esse endpoint",
    error_stack: [],
  })
  @Response<OAuthI>(404, "Not found", {
    error_code: "404",
    error_description: "Not found",
    error_source: "Not found: Usuário não encontrado",
    error_stack: [],
  })
  @Response<OAuthI>(500, "Internal server error", {
    error_code: "500",
    error_description: "Internal server error",
    error_source:
      "Internal server error: Erro ao comunicar com o endpoint externo",
    error_stack: [],
  })
  @SuccessResponse("204", "No content")
  async updateUserPassword(
    @Path() id: string,
    @Body() password: UserUpdatePasswordI,
    @Header("X-Access-Token") token: string
  ): Promise<void> {
    await this.keycloakService.updateUserPassword(id, password, token);
  }
}
