import { Router } from 'express'
import { UsersController } from './users.controller'

export class UsersRoutes {
  public router: Router
  public usersController: UsersController = new UsersController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    this.router.post('/register', this.usersController.registerUser)
    this.router.post('/login', this.usersController.authenticate)
  }
}
