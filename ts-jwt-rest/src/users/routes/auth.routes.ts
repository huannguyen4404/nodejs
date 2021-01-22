import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

export class AuthRoutes {
  public router: Router
  public authController: AuthController = new AuthController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    // DEMO only, consider to use an Identify Provider
    this.router.post('/register', this.authController.register)
    this.router.post('/login', this.authController.login)

    // other routes
    this.router.post('/reset', this.authController.resetPassword)
    this.router.get('/verify', this.authController.verifyEmail)
  }
}
