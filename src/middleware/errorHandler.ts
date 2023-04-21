import { Request, Response, NextFunction } from 'express'
import config from '../config'

/**
 * 500 response & log when errors are raised.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('errorHandler', err)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: config.nodeEnv === 'production' ? 'unknown error' : `${err}`
  })
}

export default errorHandler
