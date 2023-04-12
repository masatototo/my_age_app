import React, { useEffect } from 'react'
import { useContext } from 'react'
import { rekognizeResults } from './_app'
import styles from '../styles/resultPage.module.css';

const resultPage = () => {

  const { resultData, setResultData } = useContext(rekognizeResults);
  return (
    <div className={styles.result_text}>
      <p>resultPage</p>
      <p>High : {resultData?.FaceDetails[0].AgeRange.High}</p>
      <p>Low : {resultData?.FaceDetails[0].AgeRange.Low}</p>
      {/* オプショナルチェーン */}
    </div>
  )
}

export default resultPage;

