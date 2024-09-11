import { z } from 'zod'

export const createUserSchema = z.object({
  username: z.string(),
  enabled: z.boolean(),
  totp: z.boolean(),
  emailVerified: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  disableableCredentialTypes: z.array(z.string()),
  requiredActions: z.array(z.string()),
  notBefore: z.number(),
  access: z.object({
    manageGroupMembership: z.boolean(),
    view: z.boolean(),
    mapRoles: z.boolean(),
    impersonate: z.boolean(),
    manage: z.boolean(),
  }),
  realmRoles: z.array(z.string()),
})
