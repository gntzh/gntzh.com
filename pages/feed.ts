import { Feed } from 'feed'
import { GetServerSideProps } from 'next'
import { getPosts } from '../lib/notion'

const DOMAIN = 'https://gntzh.com'

const generateRSS = (posts: any) => {
  const feed = new Feed({
    title: "Grant's Blog",
    description: "Grant's Blog",
    id: `${DOMAIN}/blog`,
    link: DOMAIN,
    copyright: 'CC BY-NC-SA 4.0 © 2022 Grant Zhang',
    image: `${DOMAIN}/favicon.ico`,
    favicon: `${DOMAIN}/favicon.ico`,
    author: {
      name: 'Grant Zhang',
      email: 'grant@gntzh.com',
      link: DOMAIN,
    },
  })

  posts.forEach((post: any) => {
    feed.addItem({
      title: post.properties.title.title[0].text.content,
      id: post.id,
      link: `${DOMAIN}/blog/${post.properties.slug.rich_text[0].text.content}`,
      description: post.properties.summary.rich_text[0].text.content,
      date: new Date(post.properties.date.date.start),
    })
  })
  return feed.rss2()
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate'
  )
  const posts = await getPosts()
  const xmlFeed = generateRSS(posts)
  res.setHeader('Content-Type', 'text/xml')
  res.write(xmlFeed)
  res.end()
  return { props: {} }
}

export default () => null
