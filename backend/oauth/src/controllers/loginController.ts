import { Request, Response } from 'express'
import { z } from 'zod'
import { loginSchema } from '../schemas/loginSchema.js'

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const validatedInput = req.body as z.infer<typeof loginSchema>

    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(validatedInput),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
