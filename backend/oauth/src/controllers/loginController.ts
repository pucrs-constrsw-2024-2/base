import { Request, Response } from 'express'
import { z } from 'zod'
import { loginSchema } from '../schemas/loginSchema.js'

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const validatedInput = loginSchema.parse(req.body)

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
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid input', details: error.errors })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
