import {RequestHandler} from 'express'
import config from '../../config'

/**
 * Health check endpoint
 */
const getStatus: RequestHandler = (req, res) => {
    res.status(200).json({
        name: config.name,
        description: config.description,
        version: config.version
    })
}

export default getStatus
