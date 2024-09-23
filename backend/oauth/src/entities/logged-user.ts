interface RealmAccess {
  roles: string[];
}

interface ResourceAccess {
  [key: string]: {
    roles: string[];
  };
}

export interface LoggedUser {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
