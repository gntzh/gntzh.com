import { ImageBlock } from '@notion-stuff/v4-types'
import { renderRichTexts } from './utils'

export default function NotionBlockImage({
  block: { image: value },
}: {
  block: ImageBlock
}) {
  const url = value.type === 'external' ? value.external.url : value.file.url
  const caption = value.caption
  return (
    <figure>
      <img alt="" className="my-0" src={url} />
      {caption.length && (
        <figcaption className="text-center">
          {renderRichTexts(caption)}
        </figcaption>
      )}
    </figure>
  )
}
