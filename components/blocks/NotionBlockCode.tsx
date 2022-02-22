import { CodeBlock } from '@notion-stuff/v4-types'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'

export default function NotionCode({
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
      {value.text[0].plain_text}
    </SyntaxHighlighter>
  )
}
