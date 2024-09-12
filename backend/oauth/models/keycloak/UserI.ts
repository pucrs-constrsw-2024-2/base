export interface UserI {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  enabled: boolean;
}

export interface UserUpdateI {
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface UserUpdateKeycloakI {
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserUpdatePasswordI {
  password: string;
}