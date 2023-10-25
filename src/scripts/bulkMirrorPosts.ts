// import moment library
import moment from 'moment'
import showdown from 'showdown'
import config from '../config'
import { getCollectionItems, postCollectionItem } from '../utils/webFlow'
import { getMirrorPosts } from '../utils/mirror'
import { slugify } from '../utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const excerptHtml = require('excerpt-html')

;(async () => {
  try {
    const collectionItems = await getCollectionItems(config.wfCollectionID, config.wfAPIKey)
    const blogPosts = await getMirrorPosts(config.mirrorAddress)
    const converter = new showdown.Converter()
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    blogPosts?.data?.projectFeed?.posts.forEach(async (post: any) => {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const postExists = collectionItems?.items?.filter((item: any) => {
        return item?.mirrorid !== undefined && item?.mirrorid === post?._id
      })
      if (postExists) {
        console.log(`Blog post from mirror with id ${post._id} already exists in Webflow!`)
        return
      } else {
        const data = {
          name: post.title,
          slug: slugify(post.title),
          mirrortitle: post.title, // OK
          type: 'Article', // OK
          mirrorid: post._id, // OK
          mirrorpublishedtimestamp: post.publishedAtTimestamp, // OK
          mirrorimage: post.featuredImage.url, // OK
          mirrorpostcreated: moment.unix(post.publishedAtTimestamp).format('DD MMM YYYY'), // OK
          mirrorcontent: converter.makeHtml(post.body), // OK
          mirrorcontenttextexcerpt: excerptHtml(converter.makeHtml(post.body), {
            stripTags: true,
            pruneLength: 150,
            pruneString: '…',
            pruneSeparator: ' ' // Separator to be used to separate words
          }), // OK
          mirrorposturl: `https://mirror.xyz/${config.mirrorAddressEns}/${post.digest}`, //OK
          mirrorpostcreators:
            'leafilipo.eth' === post.publisher.member.ens
              ? `${post.publisher.member.displayName} | rsousamarques`
              : post.publisher.member.displayName, // OK
          // The blog post only have one owner, so to fix this we did this little hack
          contentcreated: moment.unix(post.publishedAtTimestamp).format('DD MMM YYYY') // OK
        }

        // Apply replacements
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const replaceString = config.replaceStrings.find((replaceString: any) => {
          return replaceString.id === data.mirrorid
        })

        if (replaceString) {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          replaceString.replace.forEach((replace: any) => {
            data[replace.field as keyof typeof data] = data[replace.field as keyof typeof data].replace(
              replace.search,
              replace.replace
            )
          })
        }

        // console.log('data', data)
        await postCollectionItem(config.wfCollectionID, config.wfAPIKey, data)
        console.log(`Blog post from mirror with id ${post._id} was imported!`)
      }
    })
  } catch (e) {
    console.error(e)
  }
})()
