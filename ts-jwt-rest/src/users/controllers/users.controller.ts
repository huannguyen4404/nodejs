import { Request, Response } from 'express'
import usersService from '../users.service'

export class UsersController {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      await usersService.create(req.body)
      res.status(201).send({ created: true })
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  authenticate(): void {
    //
  }
}
