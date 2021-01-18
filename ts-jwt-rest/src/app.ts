import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { ProductsRouter } from './products/products.routes'
import { UsersRoutes } from './users/users.routes'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    this.dbConnect()
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
  }

  public routes(): void {
    this.app.use('/api/users', new UsersRoutes().router)
    this.app.use('/api/products', new ProductsRouter().router)
  }

  private dbConnect() {
    // Connect with DB
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`API is running on ${this.app.get('port')}`)
    })
  }
}

const app = new App()
app.start()
