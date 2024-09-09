import jwt from "jsonwebtoken";
import { TokenPayloadI } from "../models/keycloak/TokenI";

export class JwtAdapter {
  decode(token: string): TokenPayloadI | null {
    return jwt.decode(token) as TokenPayloadI;
  }
}
