import { RequestHandler } from 'express'
import numbro from 'numbro'
import { DataWarehouse } from '../../services/classes/dataWarehouse.class'
import config from '../../config'

/**
 * Get treasury indicator
 */
const getTreasuryIndicator: RequestHandler = async (req, res) => {
  try {
    const dataWarehouse = DataWarehouse.getInstance()
    const row = await dataWarehouse.getTotalAmountManagedV3()
    console.log('row', row)
    const value = row.length > 0 ? row[0]['value'] : config.defaultTreasuryIndicatorValue

    const formattedValue = numbro(value).format({ thousandSeparated: true, mantissa: 0 })

    res.status(200).json({ value, formattedValue })
  } catch (error) {
    console.error('Error getting AUM', error)
    res.status(500).json({
      error: 'Error getting AUM'
    })
  }
}

export default getTreasuryIndicator
