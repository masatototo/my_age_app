import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja" prefix="og:http://ogp.me/ns#">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
      <body className='bg-gradient-to-r from-cyan-100 to-sky-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
