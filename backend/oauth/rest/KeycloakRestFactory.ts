import { HttpAdapter } from "../adapters/HttpAdapter";
import { JwtAdapter } from "../adapters/JwtAdapter";
import { KeycloakRest } from "./KeycloakRest";

export class KeycloakRestFactory {
  static create(): KeycloakRest {
    return new KeycloakRest(new HttpAdapter(), new JwtAdapter());
  }
}
