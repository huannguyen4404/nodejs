/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

export class UsersController {
  async registerUser(req: Request, res: Response): Promise<void> {
    //
  }

  authenticate(req: Request, res: Response, next: NextFunction): void {
    //
  }
}
