import { KeycloakServiceFactory } from "../../services/KeycloakServiceFactory";
import { KeycloakController } from "./KeycloakController";

export class KeycloakControllerFactory {
  create(): KeycloakController {
    const keycloakService = KeycloakServiceFactory.create();

    return new KeycloakController(keycloakService);
  }
}
