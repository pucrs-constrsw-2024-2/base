export interface TokenPayloadI {
  realm_access: {
    roles: string[];
  };
  [key: string]: any;
}
