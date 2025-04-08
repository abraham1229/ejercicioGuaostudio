import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  // Manejar errores creados en router
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  next() // Debe seguir a la siguiente funcion del router
}