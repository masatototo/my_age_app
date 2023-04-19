import React from 'react'
import styles from "../styles/index.module.css";
import Link from 'next/link';
import Head from 'next/head';

export const Home = () => {
  return (
    <>
    <Head>
      <title>Top Page</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="MyAge" />
      <meta property="og:description" content="顔診断" />
      <meta property="og:url" content="https://my-age-app.vercel.app/resultPage" />
      <meta property="og:site_name" content="MyAge 顔診断" />
      <meta key="og:image" property="og:image" content="https://my-age-app.vercel.app/api/ir?id=MyAge顔診断"/>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sasakimasato9" />
    </Head>
    <div className={styles.main}>
      <div className={styles.camera}>
          <img className={styles.cameraicon} src="/images/cameraIcon.svg" alt="カメラアイコン" />
      </div>
      <h1>My Age 顔診断</h1>
      <Link href="/camera" className={styles.camerabutton} >
      <div className={styles.playbutton}>Play</div>
      </Link>
    </div>
    </>
  )
}

export default Home