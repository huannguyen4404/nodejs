import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
import errorMiddleware from './common/middleware/error.middleware'
import notFoundMiddleware from './common/middleware/notFound.middleware'
import { UPLOAD_DIR } from './configs/paths.config'
import orderRouter from './orders/orders.routes'
import productRouter from './products/products.routes'
import userRouter from './users/users.routes'

dotenv.config()

const app = express()

// configs
app.use(morgan('dev'))
app.use('/uploads', express.static(UPLOAD_DIR))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())
app.use(cors())

// connect DB
const connectOpts = {
  // autoReconnect: true,
  // keepAlive: true,
  // socketTimeoutMS: 3000,
  // connectTimeoutMS: 3000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false, // Don't build indexes
}
mongoose.connect(process.env.MONGODB_URI || '', connectOpts)

// routers
app.use('/api/orders', orderRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

// catch errors
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App is listening on port ${port}`))
