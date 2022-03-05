import { Blocks } from '@notion-stuff/v4-types'
import clsx from 'clsx'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { slugify } from '../lib/slugify'
import { parseRichTexts } from './blocks/utils'

export interface IHeading {
  id: string
  title: string
  children: IHeading[]
}

function useTOCHighlight() {
  const timeoutRef = useRef<number | null>(null)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  useEffect(() => {
    IntersectionObserver
    function updateActiveLink() {
      const headings = Array.from(
        document.querySelectorAll('#post-content :where(h2, h3)')
      )

      for (let index = 0; index < headings.length - 1; index++) {
        const heading = headings[index]
        if (index === 0 && window.scrollY === 0) {
          setCurrentSection(null)
          return
        }
        const { top } = headings[index + 1].getBoundingClientRect()
        if (top > 50) {
          setCurrentSection(heading.id)
          return
        }
      }
      if (headings.length) {
        setCurrentSection(headings[headings.length - 1].id)
      }
    }

    function throttledUpdateActiveLink() {
      if (timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null
          updateActiveLink()
        }, 100)
      }
    }
    document.addEventListener('scroll', throttledUpdateActiveLink)
    document.addEventListener('resize', throttledUpdateActiveLink)
    updateActiveLink()
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      document.removeEventListener('scroll', throttledUpdateActiveLink)
      document.removeEventListener('resize', throttledUpdateActiveLink)
    }
  }, [])
  return { currentSection }
}

const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
  event.preventDefault()
  const id = (event.target as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(
    decodeURIComponent(id)
  ) as HTMLAnchorElement
  heading.scrollIntoView({ behavior: 'smooth' })
  history.pushState(null, '', (event.target as HTMLAnchorElement).href)
}

export default function TableOfContents({ blocks }: { blocks: Blocks }) {
  const headings: IHeading[] = []
  const { currentSection } = useTOCHighlight()
  let title
  blocks.forEach((block) => {
    if (block.type === 'heading_2') {
      // @ts-ignore incompatible @notion-stuff/v4-types version of v1
      title = parseRichTexts(block.heading_2.rich_text)
      headings.push({
        title,
        id: slugify(title),
        children: [],
      })
    } else if (block.type === 'heading_3' && headings.length > 0) {
      // @ts-ignore incompatible @notion-stuff/v4-types version of v1
      title = parseRichTexts(block.heading_3.rich_text)
      headings[headings.length - 1].children.push({
        title,
        id: slugify(title),
        children: [],
      })
    }
  })
  return (
    <ul id="post-toc" className="text-sm leading-6">
      {headings.map(({ id, title, children }) => {
        return (
          <li key={id}>
            <a
              className={clsx(
                'outline-link py-1 transition-all duration-300',
                currentSection === id
                  ? 'font-semibold text-slate-800 dark:text-slate-300'
                  : 'hover:font-semibold hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300'
              )}
              href={`#${id}`}
              onClick={handleClick}
            >
              {title}
            </a>
            {children.length > 0 && (
              <ul>
                {children.map(({ id, title }) => (
                  <li key={id} className="ml-4">
                    <a
                      className={clsx(
                        'outline-link py-1 transition-all duration-300',
                        currentSection === id
                          ? 'font-semibold text-slate-800 dark:text-slate-300'
                          : 'hover:font-semibold hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300'
                      )}
                      href={`#${id}`}
                      onClick={handleClick}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
