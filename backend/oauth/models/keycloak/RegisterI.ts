export interface RegisterRequestI {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface RegisterRequestKeycloakI {
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  credentials: {
    type: string;
    value: string;
  }[];
}
