import { File, RichText, RichTextText } from '@notion-stuff/v4-types'
import { Fragment } from 'react'

export function parseFile(obj: File) {
  switch (obj.type) {
    case 'external':
      return { url: obj.external.url, caption: obj.caption, expire: null }
    case 'file':
      return {
        url: obj.file.url,
        caption: obj.caption,
        expire: obj.file.expiry_time,
      }
  }
}

export function renderRichText(text: RichText) {
  const {
    annotations: { bold, code, italic, strikethrough, underline },
  } = text
  // TODO Equation objects
  let url: string | undefined
  let content = text.plain_text
  switch (text.type) {
    case 'text':
      url = text.text.link?.url
      break
    case 'mention':
      const mention = text.mention
      switch (mention.type) {
        case 'link_preview':
          url = mention.link_preview.url
          content = '🔗' + content
          break
      }
      break
  }
  let e = underline ? <span className="underline">{content}</span> : content
  if (bold) {
    e = <strong>{e}</strong>
  }
  if (italic) {
    e = <em>{e}</em>
  }
  if (strikethrough) {
    e = <del>{e}</del>
  }
  if (url) {
    e = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {e}
      </a>
    )
  }
  if (code) {
    e = <code>{e}</code>
  }
  return e
}

export function renderRichTexts(texts: RichText[]) {
  return texts.map((text, index) => (
    <Fragment key={index}>{renderRichText(text as RichTextText)}</Fragment>
  ))
}
