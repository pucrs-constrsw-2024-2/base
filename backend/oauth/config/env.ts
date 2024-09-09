import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("OAUTH_INTERNAL_PORT").default("3100").asPortNumber(),
  KEYCLOAK_REALM: get("KEYCLOAK_REALM").required().asString(),
  KEYCLOAK_URL: 
    [get("OAUTH_INTERNAL_PROTOCOL").required().asString(),
    "://",
    get("KEYCLOAK_EXTERNAL_HOST").required().asString(),
    ":",
    get("KEYCLOAK_EXTERNAL_PORT").required().asString()
    ].join(''),
  KEYCLOAK_CLIENT_ID: get("KEYCLOAK_CLIENT_ID").required().asString(),
  KEYCLOAK_CLIENT_SECRET: get("KEYCLOAK_CLIENT_SECRET").required().asString(),
};