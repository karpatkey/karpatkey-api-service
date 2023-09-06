import config from '../config'
import {getCollectionItems, postCollectionItem} from '../utils/webFlow'
import {buildUrl, getUserTweets} from '../utils/twitter'
import moment from 'moment'
import showdown from 'showdown'

;(async () => {
    try {
        const tweets = await getUserTweets()
        const collectionItems = await getCollectionItems(config.wfCollectionID, config.wfAPIKey)
        const converter = new showdown.Converter({
            underline: true,
        })

        for (const item of tweets) {
            const {data, resp} = item
            for (const tweet of data) {
                const tweetExists = collectionItems?.items?.find((item: any) => item?.twitterid === tweet?.id)
                if (tweetExists) {
                    console.log(`Tweet post with id ${tweet?.id} already exists in Webflow!`)
                } else {
                    let text = tweet.text
                    if (tweet?.entities?.urls?.length > 0) {
                        tweet?.entities?.urls?.forEach((url: any) => {
                            if(url.media_key) {
                                const media = resp?.includes?.media.find((element: any) => element.media_key === url.media_key);
                                if (media.type === 'photo') {
                                    text = text.replace( url.url, `<img style="border-radius: 16px; margin-top: 25px; margin-bottom: 25px;" src="${media.url}" alt="${media.type}" />`)
                                }
                            } else {
                                text = text.replace(url.url, `<a id="anchor-inside-tweet" target="_blank" href="${url.expanded_url}">${url.display_url}</a>`)
                            }
                        })
                    }

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
                        mirrorpublishedtimestamp: moment(tweet.created_at).unix(),
                    }

                    await postCollectionItem(config.wfCollectionID, config.wfAPIKey, data)
                    console.log(`Blog post from mirror with id ${tweet.id} was imported!`)
                }
            }
        }

    } catch (e) {
        console.error(e)
    }
})()
