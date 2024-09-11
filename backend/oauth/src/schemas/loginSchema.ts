import { z } from 'zod'

export const loginSchema = z.object({
  grant_type: z.string().min(1, 'Grant type is required'),
  client_id: z.string().min(1, 'Client id is required'),
  client_secret: z.string().min(1, 'Client secret is required'),
  username: z.string().min(1, 'Username must be at least 1 character long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type LoginInput = z.infer<typeof loginSchema>
