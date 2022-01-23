import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import GitHubIcon from '~icons/ri/github-line.jsx'

const NavLink = (props: { href: string; children: any; [x: string]: any }) => {
  const { href, children, ...rest } = props
  return (
    <Link href={props.href}>
      <a
        className="ml-4 first:ml-0 opacity-60 hover:opacity-100 border-0"
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
}

export default function TheHeader() {
  return (
    <header className="flex justify-between p-6 dark:text-gray-300">
      <Link href="/">
        <a className="border-b-2">Grant</a>
      </Link>
      <div className="flex items-center text-gray-700 dark:text-gray-200">
        <nav className="flex items-center">
          <NavLink href="/blog" title="Blog">
            Blog
          </NavLink>
          <NavLink
            href="https://github.com/gntzh"
            target="_blank"
            title="GitHub"
          >
            <GitHubIcon />
          </NavLink>
        </nav>
        <div className="ml-4 flex items-center opacity-70 hover:opacity-100">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
