import { CodeBlock } from '@notion-stuff/v4-types'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'

export default function NotionBlockCode({
  block: { code: value },
}: {
  block: CodeBlock
}) {
  return (
    <SyntaxHighlighter
      language={value.language}
      // style={theme}
      // PreTag={PreTag}
      className={'language-' + value.language}
      useInlineStyles={false}
    >
      {
        // @ts-ignore incompatible @notion-stuff/v4-types version of v1
        value.rich_text[0].plain_text
      }
    </SyntaxHighlighter>
  )
}
