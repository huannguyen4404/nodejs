import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'

dotenv.config()

const app = express()

// configs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}`))
