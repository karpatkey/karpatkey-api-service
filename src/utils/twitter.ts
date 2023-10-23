import needle from 'needle'
import config from '../config'

const userId = config.twitterCredentials.user_id
const url = `https://api.twitter.com/2/users/${userId}/tweets`

const bearerToken = config.twitterCredentials.bearer_token

const buildUrl = (userId: string, tweetId: string) => {
  return `https://twitter.com/${userId}/status/${tweetId}`
}

const getUserTweets = async (startTime: string, endTime: string) => {
  const userTweets: any[] = []

  const params = {
    start_time: startTime,
    end_time: endTime,
    max_results: 100,
    'tweet.fields': 'id,text,entities,conversation_id,created_at',
    'user.fields': 'username,created_at',
    expansions: 'author_id,attachments.media_keys',
    'media.fields': 'duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width'
  }

  const options = {
    headers: {
      'User-Agent': 'v2UserTweetsJS',
      authorization: `Bearer ${bearerToken}`
    }
  }

  let hasNextPage = true
  let nextToken = null
  let userName
  console.log('Retrieving Tweets...')

  while (hasNextPage) {
    const resp = await getPage(params, options, nextToken)
    if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
      userName = resp.includes.users[0].username
      if (resp.data) {
        for(const tweet of resp.data) {
          const item = {
            ...tweet,
            media: resp?.includes?.media ?? [],
          }
          userTweets.push(item as any)
        }
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token
      } else {
        hasNextPage = false
      }
    } else {
      hasNextPage = false
    }
  }

  console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`)
  return userTweets
}

const getPage = async (params: any, options: any, nextToken: any) => {
  if (nextToken) {
    params.pagination_token = nextToken
  }

  try {
    const resp = await needle('get', url, params, options)

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${JSON.stringify(resp.body)}`)
      return
    }
    return resp.body
  } catch (err) {
    throw new Error(`Request failed: ${err}`)
  }
}

export { getUserTweets, buildUrl }
