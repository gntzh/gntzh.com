import { Client } from '@notionhq/client'
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID as string
const NOTION_KEY = process.env.NOTION_KEY as string

const notion = new Client({ auth: NOTION_KEY })

export const getPosts = async () => {
  const res = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  })
  return res.results
}

export const getBlocks = async (blockId: string) => {
  const res = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100, // TODO Blocks pagination
  })
  return res.results
}

export const getPost = async (slug: string) => {
  const res = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: 'Published',
          },
        },
        {
          property: 'slug',
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  })
  if (!res.results.length) {
    return null
  }
  const page = await notion.pages.retrieve({ page_id: res.results[0].id })
  const blocks = await getBlocks(page.id)
  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block: any) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children
    }
    return block
  })
  return { page, blocks: blocksWithChildren }
}

export type Posts = Awaited<ReturnType<typeof getPosts>>
