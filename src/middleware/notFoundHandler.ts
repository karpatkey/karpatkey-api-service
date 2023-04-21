import { Request, Response } from 'express'

/**
 * 404 response
 */
const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not found'
  })
}

export default notFoundHandler
