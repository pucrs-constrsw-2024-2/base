import { passwordSchema } from './../schemas/passwordSchema.js'
import { Request, Response } from 'express'
import { z } from 'zod'
import { createUserSchema } from '../schemas/userSchema.js'

export const getUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(data)
    }

    res.json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = req.params.id

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json(data)
    }
    res.json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const userData = req.body as z.infer<typeof createUserSchema>

    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json(errorData)
    }

    res.status(201).send()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = req.params.id

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const updatedData = req.body

    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      },
    )
    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json(errorData)
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = req.params.id

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json(errorData)
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updatePassword = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = req.params.id

  try {
    const passwordData = req.body as z.infer<typeof passwordSchema>
    const payload = {
      value: passwordData.password,
      type: 'password',
      temporary: false,
    }
    const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}/reset-password`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )
    if (!response.ok) {
      const errorData = await response.json()
      return res.status(response.status).json(errorData)
    }
    res.status(204).send()
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
