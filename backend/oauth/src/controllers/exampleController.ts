import { Request, Response } from 'express'
import { exampleSchema, ExampleInput } from '../schemas/exampleSchema.js'
import { z } from 'zod'

export const exampleController = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' })
}

export const createExampleController = (req: Request, res: Response) => {
  try {
    const validatedData: ExampleInput = exampleSchema.parse(req.body)
    res.status(201).json({ message: 'Data created successfully', data: validatedData })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
