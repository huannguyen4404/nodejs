import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import errorMiddleware from './common/middleware/error.middleware'
import notFoundMiddleware from './common/middleware/notFound.middleware'
import orderRouter from './orders/orders.routes'
import productRouter from './products/products.routes'

dotenv.config()

const app = express()

// configs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

// routers
app.use('/api/orders', orderRouter)
app.use('/api/products', productRouter)

// catch errors
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App is listening on port ${port}`))
