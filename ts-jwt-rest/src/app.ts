import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

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
    // Load routes
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
