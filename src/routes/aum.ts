import express from 'express'
import getAum from '../controllers/aum/getAum'

const aum = express.Router()

aum.get('/', getAum)

export default aum
