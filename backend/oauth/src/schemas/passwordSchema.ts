import { z } from 'zod'

export const passwordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  
  export type PasswordInput = z.infer<typeof passwordSchema>
  