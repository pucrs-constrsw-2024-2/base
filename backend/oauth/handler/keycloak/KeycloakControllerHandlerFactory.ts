import { KeycloakControllerFactory } from "../../controller/keycloak/KeycloakControllerFactory";
import { KeycloakControllerHandler } from "./KeycloakControllerHandler";

export class KeycloakControllerHandlerFactory {
  static create(): KeycloakControllerHandler {
    const keycloakController = KeycloakControllerFactory.create();
    return new KeycloakControllerHandler(keycloakController);
  }
}
