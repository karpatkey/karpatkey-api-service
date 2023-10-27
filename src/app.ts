import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import config from './config'
import errorHandler from './middleware/errorHandler'
import notFoundHandler from './middleware/notFoundHandler'
import aum from './routes/aum'
import treasuryIndicator from './routes/treasury_indicator'
import status from './routes/status'
import posts from './routes/posts'

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    // @ts-ignore
    origin: config.clientOrigins[config.nodeEnv]
  })
)
app.use(helmet())
app.use(morgan('tiny'))

// Apply routes before error handling
app.use('/', status)
app.use('/aum', aum)
app.use('/treasury_indicator', treasuryIndicator)
app.use('/posts', posts)

// Not found handler
app.use('*', notFoundHandler)

// Always apply error handling last
app.use(errorHandler)

export default app
