import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import GitHubIcon from '~icons/ri/github-line.jsx'
import FeedIcon from '~icons/ri/rss-line.jsx'

const NavLink = (props: { href: string; children: any; [x: string]: any }) => {
  const { href, children, ...rest } = props
  return (
    <Link href={props.href}>
      <a
        className="ml-4 first:ml-0 opacity-60 hover:opacity-100 border-0 transition-all duration-200"
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
        <a className="border-b-2 border-b-gray-900/50 hover:border-b-gray-900 dark:border-b-gray-200/50 dark:hover:border-b-gray-200 transition-all duration-200">
          Grant
        </a>
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
          <NavLink href="/feed" target="_blank" title="RSS">
            <FeedIcon />
          </NavLink>
        </nav>
        <div className="ml-4 flex items-center opacity-70 hover:opacity-100">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
