import { RequestHandler } from 'express'
import numbro from 'numbro'
import { DataWarehouse } from '../../services/classes/dataWarehouse.class'
import config from '../../config'

/**
 * Get Non-custodial assets under management endpoint
 */
const getAum: RequestHandler = async (req, res) => {
  try {
    const dataWarehouse = DataWarehouse.getInstance()
    const row = await dataWarehouse.getTotalAmountManagedV2()
    const value = row.length ? row[0]['f0_'] : config.defaultAumValue

    const formattedValue = numbro(value).format({ thousandSeparated: true, mantissa: 0 })

    res.status(200).json({ value, formattedValue })
  } catch (error) {
    console.error('Error getting AUM', error)
    res.status(500).json({
      error: 'Error getting AUM'
    })
  }
}

export default getAum
