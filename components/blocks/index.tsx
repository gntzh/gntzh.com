import { Fragment } from 'react'
import clsx from 'clsx'
import LinkIcon from '~icons/ri/links-line.jsx'
import { slugify } from '../../lib/slugify'
import NotionBlockCode from './NotionBlockCode'
import NotionBlockImage from './NotionBlockImage'
import { parseRichTexts, renderRichTexts } from './utils'

export default function renderNotionBlock(block: any) {
  const value = block[block.type]
  let slug
  switch (block.type) {
    case 'paragraph':
      return <p>{renderRichTexts(value.text)}</p>
    case 'heading_1':
    case 'heading_2':
      slug = slugify(parseRichTexts(value.text))
      return (
        <h2 id={slug} className="not-prose flex items-center group">
          {renderRichTexts(value.text)}
          <a
            href={`#${slug}`}
            className="text-[0.875rem] ml-1 opacity-0 group-hover:opacity-40 hover:!opacity-80 transition-opacity"
          >
            <LinkIcon />
          </a>
        </h2>
      )
    case 'heading_3':
      slug = slugify(parseRichTexts(value.text))
      return (
        <h3 id={slug} className="not-prose flex items-center group">
          {renderRichTexts(value.text)}
          <a
            href={`#${slug}`}
            className="text-[0.75rem] align-baseline ml-1 opacity-0 group-hover:opacity-40 hover:!opacity-80 transition-opacity"
          >
            <LinkIcon />
          </a>
        </h3>
      )
    // TODO numbered list
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className="list-disc list-inside my-1">
          {renderRichTexts(value.text)}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <input
            type="checkbox"
            disabled
            defaultChecked={value.checked}
            className="mr-1"
          />
          <span className={clsx({ 'opacity-75': value.checked })}>
            {renderRichTexts(value.text)}
          </span>
        </div>
      )
    case 'code':
      return <NotionBlockCode block={block} />
    case 'image':
      return <NotionBlockImage block={block} />
    case 'quote':
      return <blockquote>{renderRichTexts(value.text)}</blockquote>
    case 'callout':
      return (
        <blockquote className="flex">
          <div className="-ml-4">{value.icon.emoji}</div>
          <div>{renderRichTexts(value.text)}</div>
        </blockquote>
      )
    case 'toggle':
      return (
        <details>
          <summary>{renderRichTexts(value.text)}</summary>
          <div>
            {value.children.map((block: any) => (
              <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
            ))}
          </div>
        </details>
      )
    case 'divider':
      return <hr />
    default:
      return (
        <p>
          `❌ Unsupported block ($
          {block.type === 'unsupported'
            ? 'unsupported by Notion API'
            : block.type}
          )`
        </p>
      )
  }
}
