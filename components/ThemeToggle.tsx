import { useTheme } from 'next-themes'
import LightModeIcon from '~icons/ri/sun-line.jsx'
import DarkModeIcon from '~icons/ri/moon-line.jsx'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
      {theme == 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  )
}
