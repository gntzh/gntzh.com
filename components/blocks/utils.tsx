import { RichText, RichTextText } from '@notion-stuff/v4-types'
import { Fragment } from 'react'

export function renderRichTextText(text: RichTextText) {
  const {
    annotations: { bold, code, italic, strikethrough, underline },
    text: { link, content },
  } = text
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
  if (code) {
    e = <code>{e}</code>
  }
  if (link) {
    e = (
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return e
}

export function renderRichTexts(texts: RichText[]) {
  return texts.map((text, index) => (
    <Fragment key={index}>{renderRichTextText(text as RichTextText)}</Fragment>
  ))
}
