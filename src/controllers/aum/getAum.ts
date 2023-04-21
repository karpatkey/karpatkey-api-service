import {RequestHandler} from 'express'

/**
 * Non-custodial assets under management endpoint
 */
const getAum: RequestHandler = (req, res) => {
    res.status(200).json({
        value: 1200
    })
}

export default getAum
