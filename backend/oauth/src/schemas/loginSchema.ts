import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'send a valid username' }),
  password: z.string().min(8, { message: 'password must be at least 8 character' }),
  grant_type: z.string().min(1, { message: 'send a valid grant_type' }),
  client_id: z.string().min(1, { message: 'send a valid client_id' }),
  client_secret: z.string().min(1, { message: 'send a valid client_secret' }),
})

export type LoginInput = z.infer<typeof loginSchema>
