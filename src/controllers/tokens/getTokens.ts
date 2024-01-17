import { RequestHandler } from 'express'
import { DataWarehouse } from '../../services/classes/dataWarehouse.class'

/**
 * Get tokens
 */
const getTokens: RequestHandler = async (req, res) => {
  try {
    const dataWarehouse = DataWarehouse.getInstance()
    const tokens = await dataWarehouse.getTokenDetails()

    res.status(200).json({ tokens })
  } catch (error) {
    console.error('Error getting tokens', error)
    res.status(500).json({
      error: 'Error getting tokens'
    })
  }
}

export default getTokens
