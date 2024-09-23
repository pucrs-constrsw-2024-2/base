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
    console.log(userData);
    

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

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
   const token = req.headers.authorization?.split(' ')[1]
   const userId = req.params.id

   console.log(userId);

   

  if (!token) {
     return res.status(401).json({ error: 'Unauthorized' })
 }

try {
     const updatedData = req.body
console.log(updatedData);

     const response = await fetch(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}`,
      {
         method: 'PUT',
headers: {
         Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
         body: JSON.stringify(updatedData),
     }
     )
   if (!response.ok) {
       const errorData = await response.json()
       return res.status(response.status).json(errorData)
  }

  console.log(response);
  

 res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error:', error)
     res.status(500).json({ error: 'Internal Server Error' })

}
}