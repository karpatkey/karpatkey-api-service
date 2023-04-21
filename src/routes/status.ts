import express from 'express'
import getStatus from '../controllers/status/getStatus'

const status = express.Router()

status.get('/', getStatus)

export default status
