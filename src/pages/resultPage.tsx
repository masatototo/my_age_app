import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { rekognizeResults } from './_app'
import styles from '../styles/resultPage.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { TwitterShareButton, TwitterIcon } from 'react-share';

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
  const [emotionsResult, setEmotionResult] = useState('')

  useEffect(() => {
    if(resultData) {
      const emotions = resultData.FaceDetails[0].Emotions
      const result = emotions.reduce((a: any,b :any)=>a.Confidence>b.Confidence?a:b)
      switch(result.Type) {
        case 'SAD':
          setEmotionResult('😔')
          break;
        case 'HAPPY':
          setEmotionResult('😆')
          break;
        case 'ANGRY':
          setEmotionResult('😡')
          break;
        case 'CALM':
          setEmotionResult('😌')
          break;
        case 'FEAR':
          setEmotionResult('😱')
          break;
        case 'SURPRISED':
          setEmotionResult('😳')
          break;
        case 'CONFUSED':
          setEmotionResult('😅')
          break;
      }
    }
  },[resultData])


  
  return (
    <>
    
    <div className={styles.result_text}>
    <Link href="/camera">
      <img src="/images/Cross.svg" alt="カメラページに戻る" />
    </Link>
      <h3>RESULT PAGE</h3>
      <h4>Age Range</h4>
      <div className={styles.result_text_data}>
      <p>High : {resultData?.FaceDetails[0].AgeRange.High}</p>
      <p>Low : {resultData?.FaceDetails[0].AgeRange.Low}</p>
      <p>Eyeglasses : {resultData?.FaceDetails[0].Eyeglasses.Value ? `🤓` : `👓🙅‍♂️`}</p>
      <p>Sunglasses : {resultData?.FaceDetails[0].Sunglasses.Value ? `😎`: `🕶🙅‍♂️`}</p>
      <p>Emotions : {emotionsResult}</p>
      </div>
      {/* オプショナルチェーン */}
      <TwitterShareButton url="https://my-age-app.vercel.app/" title={`My Age 顔診断 High:${resultData?.FaceDetails[0].AgeRange.High} Low : ${resultData?.FaceDetails[0].AgeRange.Low} Emotions : ${emotionsResult}`}>
    <TwitterIcon size={60} round />
</TwitterShareButton>
      {/* <a
          href={`https://twitter.com/intent/tweet`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/Meta.svg" alt="Twitterでシェア" />
        </a> */}
    </div>
    </>
  )
}

export default resultPage;

