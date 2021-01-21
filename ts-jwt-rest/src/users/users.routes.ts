import { Router } from 'express'
import { UsersController } from './controllers/users.controller'

export class UsersRoutes {
  public router: Router
  public usersController: UsersController = new UsersController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    // DEMO only, consider to use an Identify Provider
    this.router.post('/register', this.usersController.registerUser)
    this.router.post('/login', this.usersController.authenticate)
  }
}
