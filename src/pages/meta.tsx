import Head from 'next/head'
import React from 'react'

export const meta = () => {
  return (
   <>
   <Head>
    <title>Meta Page</title>
    <meta property="og:type" content="website" />
      <meta property="og:title" content="MyAge" />
      <meta property="og:description" content="顔診断" />
      <meta property="og:url" content="https://my-age-app.vercel.app/meta" />
      <meta property="og:site_name" content="MyAge 顔診断" />
      <meta key="og:image" property="og:image" content="https://my-age-app.vercel.app/api/dg"/>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sasakimasato9" />
   </Head>
   </>
  )
}
