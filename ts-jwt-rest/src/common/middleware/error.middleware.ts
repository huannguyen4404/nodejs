import { Request, Response } from 'express'
import HttpException from '../http.exception'

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  // _next: NextFunction,
): void => {
  const status = error.statusCode || 500
  const message =
    error.message || 'Oops, somethings went wrong. Check server logs.'

  response.status(status).send(message)
}
