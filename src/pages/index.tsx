import React from 'react'
import styles from "../styles/index.module.css";
import Link from 'next/link';
import Head from 'next/head';

export const Home = () => {
  return (
    <>
    <Head>
      <title>My Age 顔診断</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="MyAge" />
      <meta property="og:description" content="顔診断" />
      <meta property="og:url" content="https://my-age-app.vercel.app/" />
      <meta property="og:site_name" content="MyAge 顔診断" />
      <meta key="og:image" property="og:image" content="https://my-age-app.vercel.app/images/resize-ogp.png"/>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sasakimasato9" />
    </Head>
    <div className={styles.main}>
      <div className={styles.camera}>
          <img className={styles.cameraicon} src="/images/cameraIcon.svg" alt="カメラアイコン" />
      </div>
      <h1>My Age 顔診断</h1>
      <div className={styles.Wrapper}>
      <Link href="/camera" className={styles.camerabutton} >
      <div className={styles.playbutton}>Play</div>
      </Link>
      </div>
    </div>
    </>
  )
}

export default Home