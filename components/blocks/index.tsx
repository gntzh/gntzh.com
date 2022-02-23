import { Fragment } from 'react'
import clsx from 'clsx'
import { slugify } from '../../lib/slugify'
import NotionBlockCode from './NotionBlockCode'
import NotionBlockImage from './NotionBlockImage'
import { renderRichTexts } from './utils'

export default function renderNotionBlock(block: any) {
  const value = block[block.type]
  switch (block.type) {
    case 'paragraph':
      return <p>{renderRichTexts(value.text)}</p>
    case 'heading_1':
      return (
        <h1 id={slugify(value.text[0].plain_text)}>
          {renderRichTexts(value.text)}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 id={slugify(value.text[0].plain_text)}>
          {renderRichTexts(value.text)}
        </h2>
      )
    case 'heading_3':
      return (
        <h3 id={slugify(value.text[0].plain_text)}>
          {renderRichTexts(value.text)}
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
