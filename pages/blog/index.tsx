import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getPosts, Posts } from '../../lib/notion'

// TODO Pagination
const Blog: NextPage<{ posts: Posts }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Grant Zhang - Blog</title>
      </Head>
      <h1 className="font-bold text-xl mb-8">Blog</h1>
      {posts.map((post: any) => {
        return (
          <article key={post.id} className="mb-6 md:mb-8">
            <header className="flex justify-between  mb-2">
              <h2 className="text-xl font-medium">
                <Link
                  href={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
                >
                  <a className="border-b-0">
                    {post.properties.title.title[0].plain_text}
                  </a>
                </Link>
              </h2>
              <time className="text-gray-600 dark:text-gray-400">
                {post.properties.date.date.start}
              </time>
            </header>
            <p className="my-0 text-gray-600 dark:text-gray-400">
              {post.properties.summary.rich_text?.[0]?.plain_text}
            </p>
          </article>
        )
      })}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: posts,
    },
    revalidate: 1,
  }
}

export default Blog
