import express from 'express'
import getPosts from '../controllers/posts/getPosts'

const mirror = express.Router()

mirror.get('/', getPosts)

export default mirror
