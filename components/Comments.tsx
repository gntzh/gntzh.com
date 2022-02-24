import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Giscus } from '@giscus/react'

const Comments = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Giscus
      repo="gntzh/giscus-discussions"
      repoId="R_kgDOG5nimw"
      category="Announcements"
      categoryId="DIC_kwDOG5nim84CBUAy"
      mapping="pathname"
      reactionsEnabled="1"
      inputPosition="top"
      theme={resolvedTheme === 'light' ? 'light' : 'dark_protanopia'}
    />
  )
}

export default Comments
