import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'

export class UsersRoutes {
  public router: Router
  public usersController: UsersController = new UsersController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    //
  }
}
