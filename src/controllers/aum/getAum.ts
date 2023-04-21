import { RequestHandler } from 'express'
import { DataWarehouse } from '../../services/classes/dataWarehouse.class'
import config from '../../config'

/**
 * Get Non-custodial assets under management endpoint
 */
const getAum: RequestHandler = async (req, res) => {
  try {
    const dataWarehouse = DataWarehouse.getInstance()
    const row = await dataWarehouse.getTotalAmountManaged()
    const value = row.length ? row[0]['usd_final_underlying_and_UR_balance'] : config.defaultAumValue

    res.status(200).json({
      value
    })
  } catch (error) {
    console.error('Error getting AUM', error)
    res.status(500).json({
      error: 'Error getting AUM'
    })
  }
}

export default getAum
