import React, { useEffect } from 'react'
import { useContext } from 'react'
import { rekognizeResults } from './_app'
import styles from '../styles/resultPage.module.css';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title: string
  description: string
  url: string
  type: string
  imageUrl: string
}

const resultPage = (props: Props) => {
  const { title, description, url, type, imageUrl} = props
  const { resultData, setResultData } = useContext(rekognizeResults);
  return (
    <>
    <Head>
      <title>Hello world</title>
      <meta key="og:image" property="og:image" content="https://example.com/api/ir"/>
    </Head>
    <div className={styles.result_text}>
    <Link href="/camera">
      <img src="/images/Cross.svg" alt="カメラページに戻る" />
    </Link>
      <p>resultPage</p>
      <p>High : {resultData?.FaceDetails[0].AgeRange.High}</p>
      <p>Low : {resultData?.FaceDetails[0].AgeRange.Low}</p>
      {/* オプショナルチェーン */}
      <a
          href={`https://twitter.com/intent/tweet`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/Meta.svg" alt="Twitterでシェア" />
        </a>
    </div>
    </>
  )
}

export default resultPage;

