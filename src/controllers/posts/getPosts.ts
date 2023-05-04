import { RequestHandler } from 'express'
import config from '../../config'
import {getMirrorPosts} from "../../utils/mirror"

/**
 * Get mirror blog posts
 */
const getPosts: RequestHandler = async (req, res) => {
  try {
    const address = config.mirrorAddress
    const result = await getMirrorPosts(address)

    res.status(200).json(result)
  } catch (error) {
    console.error('Error getting posts', error)
    res.status(500).json({
      error: 'Error getting posts'
    })
  }
}

export default getPosts
