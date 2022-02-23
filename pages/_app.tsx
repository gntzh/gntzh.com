import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import NProgress from 'nprogress'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    const handleStart = (url: string) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col">
        <TheHeader />
        <div className="px-4 sm:px-6 flex-grow">
          <Component {...pageProps} />
        </div>
        <TheFooter />
      </div>
    </ThemeProvider>
  )
}

export default MyApp
