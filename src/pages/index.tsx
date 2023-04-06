import React from 'react'
import styles from "../styles/index.module.css";
import Link from 'next/link';

export const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.camera}>
          <img className={styles.cameraicon} src="/images/cameraIcon.svg" alt="カメラアイコン" />
      </div>
      <h1>My Age 顔診断</h1>
      <Link href="/camera" className={styles.camerabutton} >
      <div className={styles.startbutton}>Start</div>
      </Link>
    </div>
  )
}

export default Home