import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import TheHeader from '../components/TheHeader'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col">
        <TheHeader></TheHeader>
        <main className="px-7 flex flex-col flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer></Footer>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
