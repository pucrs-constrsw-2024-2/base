import { KeycloakRestFactory } from "../rest/KeycloakRestFactory";
import { KeycloakService } from "../services/KeycloakService";
import { KeycloakUtils } from "../utils/KeycloakUtils";

export class KeycloakServiceFactory {
  static create(): KeycloakService {
    const keycloakRest = KeycloakRestFactory.create();
    const keycloakUtils = new KeycloakUtils();

    return new KeycloakService(keycloakRest, keycloakUtils);
  }
}
