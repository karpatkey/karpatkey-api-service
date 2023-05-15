import * as moment from 'moment'
import * as showdown from 'showdown'
import config from '../config'
import { getCollectionItems, postCollectionItem } from '../utils/webFlow'
import { getMirrorPosts } from '../utils/mirror'
import { slugify } from '../utils'

const excerptHtml = require('excerpt-html')

;(async () => {
  try {
    const collectionItems = await getCollectionItems(config.wfCollectionID, config.wfAPIKey)
    const blogPosts = await getMirrorPosts(config.mirrorAddress)
    const converter = new showdown.Converter()
    blogPosts?.data?.projectFeed?.posts.forEach(async (post: any) => {
      const postExists = collectionItems?.items?.find((item: any) => item?.mirrorid === post?._id)
      if (postExists) {
        console.log(`Blog post from mirror with id ${post._id} already exists in Webflow!`)
        return
      }

      const data = {
        name: post.title,
        slug: slugify(post.title),
        mirrortitle: post.title,
        mirrordescription: post.settings.description,
        type: 'Article',
        mirrorbody: post.body,
        mirrorurl: `https://mirror.xyz/${config.mirrorAddressEns}/${post.digest}`,
        mirrorimageurl: post.featuredImage.url,
        mirrorid: post._id,
        mirrordigest: post.digest,
        mirrorpublisheraddress: post.publisher.project.address,
        mirrorpublisherdisplayname: post.publisher.project.displayName,
        mirrorpublisherens: post.publisher.project.ens,
        mirrormemberaddress: post.publisher.member.address,
        mirrormemberdisplayname: post.publisher.member.displayName,
        mirrormemberens: post.publisher.member.ens,
        mirrorpublishedtimestamp: post.publishedAtTimestamp,
        mirrorimage: post.featuredImage.url,
        mirrorpostcreated: moment.unix(post.publishedAtTimestamp).format('DD MMM YYYY'),
        mirrorcontent: converter.makeHtml(post.body),
        mirrorcontentexcerpt: excerptHtml(converter.makeHtml(post.body), {
          stripTags:   true,
          pruneLength: 150,
          pruneString: '…',
          pruneSeparator: ' ', // Separator to be used to separate words
        }),
        mirrorcontenttextexcerpt: excerptHtml(converter.makeHtml(post.body), {
          stripTags:   true,
          pruneLength: 150,
          pruneString: '…',
          pruneSeparator: ' ', // Separator to be used to separate words
        }),
        mirrorposturl: `https://mirror.xyz/${config.mirrorAddressEns}/${post.digest}`,
        // The blog post only have one owner, so to fix this we did this little hack
        mirrorpostcreators:
          'leafilipo.eth' === post.publisher.member.ens
            ? `${post.publisher.member.displayName} | rsousamarques`
            : post.publisher.member.displayName
      }
      await postCollectionItem(config.wfCollectionID, config.wfAPIKey, data)
      console.log(`Blog post from mirror with id ${post._id} was imported!`)
    })
  } catch (e) {
    console.error(e)
  }
})()
