import config from '../config'
import { getCollectionItems, postCollectionItem } from '../utils/webFlow'
import { buildUrl, getUserTweets } from '../utils/twitter'
import moment from 'moment'
import showdown from 'showdown'
import twitterText from 'twitter-text'
;(async () => {
  try {
    // Create two datetime in ISOString from today to 1 day ago
    const date = new Date()

    const endTime = date.toISOString()
    const startTime = moment(endTime).subtract(1, 'day').toISOString()

    const tweets = (await getUserTweets(startTime, endTime)).sort((a: any, b: any) => {
      const aTime = moment(a?.created_at).unix()
      const bTime = moment(b?.created_at).unix()
      const aFirstLetter = a?.text?.charAt(0)
      const bFirstLetter = b?.text?.charAt(0)
      if (aTime === bTime) {
        if (aFirstLetter < bFirstLetter) {
          return -1
        }
        if (aFirstLetter > bFirstLetter) {
          return 1
        }
        return 0
      }
      return aTime - bTime
    })

    const collectionItems = await getCollectionItems(config.wfCollectionID, config.wfAPIKey)
    const converter = new showdown.Converter({
      underline: true
    })

    const tweetsToDump: any[] = []

    for (const tweet of tweets) {
      const tweetExists = collectionItems?.items?.find(
        (item: any) => item?.twitterid === tweet?.id || item?.twitterid === tweet?.conversation_id
      )
      if (tweetExists) {
        console.log(`Tweet post with id ${tweet?.id} already exists in Webflow!`)
        continue
      }

      let text = tweet.text

      // Not allow to save retweets
      if (tweet?.text.startsWith('RT')) {
        continue
      }

      if (tweet?.entities?.urls?.length > 0) {
        tweet?.entities?.urls?.forEach((url: any) => {
          if (url.media_key) {
            const media = tweet?.media.find((element: any) => element.media_key === url.media_key)
            if (media.type === 'photo') {
              const newText = text.replace(
                url.url,
                `<img style="border-radius: 16px; margin-top: 25px; margin-bottom: 25px;" src="${media.url}" alt="${media.type}" />`
              )

              text =
                newText !== text
                  ? newText
                  : text +
                    `\n\n<img style="border-radius: 16px; margin-top: 25px; margin-bottom: 25px;" src="${media.url}" alt="${media.type}" />`
            }
            if (media.type === 'video') {
              const newText = text.replace(
                url.url,
                `<img style="border-radius: 16px; margin-top: 25px; margin-bottom: 25px;" src="${media.preview_image_url}" alt="${media.preview_image_url}" />`
              )

              text =
                newText !== text
                  ? newText
                  : text +
                    `\n\n<img style="border-radius: 16px; margin-top: 25px; margin-bottom: 25px;" src="${media.preview_image_url}" alt="${media.preview_image_url}" />`
            }
          } else {
            if (!url.expanded_url.includes('/status/')) {
              text = text.replace(
                url.url,
                `<a id="anchor-inside-tweet" target="_blank" href="${url.expanded_url}">${url.display_url}</a>`
              )
            } else {
              text = text.replace(url.url, '')
            }
          }
        })
      }

      // Just notice that the character 🫡  U+1FAE1  (saluting face) in the browsers, will be rendered like that , see here https://unicode.org/emoji/charts/full-emoji-list.html#1fae1

      text = twitterText.autoLinkUsernamesOrLists(text, { targetBlank: true })

      const tweetIndex = tweetsToDump.findIndex((item: any) => {
        return item.twitterid === tweet?.conversation_id
      })
      if (tweetIndex !== -1) {
        tweetsToDump[tweetIndex].twitterpostcontent = tweetsToDump[tweetIndex].twitterpostcontent + '\n\n' + text
        tweetsToDump[tweetIndex].twitterpostcontenthtml =
          tweetsToDump[tweetIndex].twitterpostcontenthtml + '\n\n' + converter.makeHtml(text)
      } else {
        const data = {
          name: tweet.id,
          slug: tweet.id,
          type: 'Twitter',
          twitterid: tweet.id,
          twitterpostcontent: text,
          twitterpostcontenthtml: converter.makeHtml(text),
          twittercreated: moment(tweet.created_at).format('DD MMM YYYY'),
          twitterposturl: buildUrl(config.twitterCredentials.user_name, tweet.id),
          twittertimestamp: moment(tweet.created_at).unix(),
          contentcreated: moment(tweet.created_at).unix(),
          mirrorpublishedtimestamp: moment(tweet.created_at).unix()
        }
        tweetsToDump.push(data)
      }
    }

    for (const tweet of tweetsToDump) {
      await postCollectionItem(config.wfCollectionID, config.wfAPIKey, tweet)
      console.log(`Tweet from twitter with id ${tweet.twitterid} was imported!`)
    }
  } catch (e) {
    console.error(e)
  }
})()
