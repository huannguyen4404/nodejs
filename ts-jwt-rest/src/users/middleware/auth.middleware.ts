import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils/secrets'

export const checkJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1] + ''
    const jwtPayload = jwt.verify(token, JWT_SECRET || '')
    res.locals.jwtPayload = jwtPayload
    next()
  } catch (error) {
    res.status(401).send({ message: 'Auth failed.' })
    return
  }
}
