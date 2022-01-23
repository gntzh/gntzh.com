import { useTheme } from 'next-themes'
import LightModeIcon from '~icons/ri/sun-line.jsx'
import DarkModeIcon from '~icons/ri/moon-line.jsx'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
      {theme == 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  )
}
