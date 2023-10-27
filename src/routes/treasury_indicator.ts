import express from 'express'
import getTreasuryIndicator from '../controllers/treasury/getTreasuryIndicator'

const treasuryIndicator = express.Router()

treasuryIndicator.get('/', getTreasuryIndicator)

export default treasuryIndicator
