export interface LoginResponseI {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export interface LoginRequestI {
  username: string;
  password: string;
}

export interface LoginRequestKeycloakI {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}
