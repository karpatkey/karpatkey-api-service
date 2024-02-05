import { RequestHandler } from 'express'
import mCache from 'memory-cache'
import { DataWarehouse } from '../../services/classes/dataWarehouse.class'

/**
 * Get tokens
 */
const getTokens: RequestHandler = async (req, res) => {
  try {
    // get tokens from cache
    const tokens = mCache.get('tokens')

    if (!tokens) {
      const dataWarehouse = DataWarehouse.getInstance()
      const tokens = await dataWarehouse.getTokenDetails()
      // let's use 1 hour and half as cache time
      mCache.put('tokens', tokens, 5400000)
      res.status(200).json({ tokens })
    } else {
      res.status(200).json({ tokens })
    }
  } catch (error) {
    console.error('Error getting tokens', error)
    res.status(500).json({
      error: 'Error getting tokens'
    })
  }
}

export default getTokens
