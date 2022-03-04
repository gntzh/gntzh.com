import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Giscus } from '@giscus/react'
import { config } from '../config'

const Comments = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Giscus
      repo={config.giscus.repo as `${string}/${string}`}
      repoId={config.giscus.repoId}
      category={config.giscus.category}
      categoryId={config.giscus.categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      inputPosition="top"
      theme={resolvedTheme === 'light' ? 'light' : 'dark'}
    />
  )
}

export default Comments
