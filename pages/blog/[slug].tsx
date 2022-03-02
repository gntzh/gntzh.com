import {
  Blocks,
  PostResult,
  PropertyValueDate,
  PropertyValueTitle,
} from '@notion-stuff/v4-types'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import renderNotionBlock from '../../components/blocks'
import Comments from '../../components/Comments'
import { getPost, getPosts } from '../../lib/notion'

const BlogPost: NextPage<{ page: PostResult; blocks: Blocks }> = ({
  page,
  blocks,
}) => {
  const title = (page.properties.title as PropertyValueTitle).title[0]
    .plain_text
  return (
    <div className="mx-auto">
      <Head>
        <title>{title} - Grant&apos;s Blog</title>
      </Head>
      <article className="prose mx-auto dark:prose-invert">
        <h1>{title}</h1>
        <p>
          <time>{(page.properties.date as PropertyValueDate).date!.start}</time>
        </p>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
        ))}
      </article>
      <div className="mx-auto prose dark:prose-invert mt-12">
        <Link href="/blog">
          <a className="font-mono">cd ..</a>
        </Link>
      </div>
      {/* add 2px border to fix width calculation errors caused by max-w-prose(65ch)*/}
      <div className="mt-12 max-w-prose mx-auto p-r-2 border-transparent">
        <Comments />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NODE_ENV == 'development') {
    return { paths: [], fallback: 'blocking' }
  }
  const posts = await getPosts()
  return {
    paths: posts.map((post: any) => ({
      params: { slug: post.properties.slug.rich_text[0].text.content },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getPost(slug)
  if (!post) {
    return { notFound: true }
  }
  return {
    props: {
      ...post,
    },
    revalidate: 60,
  }
}

export default BlogPost
