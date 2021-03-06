import type { NextPage } from 'next'
import Head from 'next/head'
import MailIcon from '~icons/ri/mail-line.jsx'

const Home: NextPage = () => {
  return (
    <div className="prose dark:prose-invert mx-auto">
      <Head>
        <title>Grant Zhang</title>
        <meta name="description" content="Grant Zhang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Grant Zhang</h1>
      <p>
        Hello, world! I am Grant Zhang, an ordinary person who does nothing.
      </p>
      <p className="my-6">
        <MailIcon className="mr-1 inline" />
        <a href="mailto:grant@gntzh.com">grant@gntzh.com</a>
      </p>
    </div>
  )
}

export default Home
