import express from 'express'
import getTokens from '../controllers/tokens/getTokens'

const tokens = express.Router()

tokens.get('/', getTokens)

export default tokens
