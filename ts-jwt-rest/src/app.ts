import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { errorHandler } from './common/middleware/error.middleware'
import { notFoundHandler } from './common/middleware/notFound.middleware'
import { ProductsRouter } from './products/products.routes'
import { UsersRoutes } from './users/users.routes'
import { MONGODB_URI } from './utils/secrets'

dotenv.config()

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

    this.app.use(notFoundHandler)
    this.app.use(errorHandler)
  }

  private dbConnect() {
    const connection = mongoose.connection
    const connectOpts = {
      autoReconnect: true,
      keepAlive: true,
      socketTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: false, // Don't build indexes
    }

    connection.on('connected', () => {
      console.log('Mongo Connection Established')
    })

    connection.on('reconnected', () => {
      console.log('Mongo Connection RE-established')
    })

    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected')
      console.log('Trying to reconnect to Mongo ...')
      setTimeout(() => {
        mongoose.connect(MONGODB_URI || '', connectOpts)
      }, 3000)
    })

    connection.on('close', () => {
      console.log('Mongo Connection Closed')
    })
    connection.on('error', (error: Error) => {
      console.log('Mongo Connection ERROR: ' + error)
    })

    const run = async () => {
      await mongoose.connect(MONGODB_URI || '', connectOpts)
    }
    run().catch((error) => console.error(error))
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`API is running on ${this.app.get('port')}`)
    })
  }
}

const app = new App()
app.start()
