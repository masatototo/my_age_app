import { useRef, useState, useCallback, useContext } from 'react';
import Webcam from "react-webcam";
import styles from "../styles/camera.module.css";
import {
  DetectFacesRequest,
  DetectFacesResponse,
  FaceDetailList,
} from "aws-sdk/clients/rekognition";
import AWS from "aws-sdk";
import Link from 'next/link';

import { rekognizeResults } from './_app'

import { ClassNames } from '@emotion/react';

import { Buffer } from 'buffer';

// @ts-ignore
// window.Buffer = Buffer;



// const videoConstraints = {
//   width: 540,
//   height: 720,
//   facingMode: "user",
// };

AWS.config.update({
  accessKeyId: "AKIA5S63C2P4B4MDTFGL",
  secretAccessKey: "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",
  region: "ap-northeast-1"
});

const rekognitionClient = new AWS.Rekognition({
  apiVersion: "2016-06-27",
});

//Amazon Rekognitionによる顔分析
const detectFaces = async (imageData: string): Promise<DetectFacesResponse> => {
  const params: DetectFacesRequest = {
    Image: {
      Bytes: Buffer.from(
        imageData.replace("data:image/jpeg;base64,",""),
        "base64"
      ),
    },
    Attributes: ["ALL"],
  };
  return await rekognitionClient.detectFaces(params).promise();
};

//分析結果からConfidense(分析結果の信頼度)取得
const getConfidence = (rekognizeResult: DetectFacesResponse): number => {
  return (rekognizeResult.FaceDetails as FaceDetailList)[0].Confidence!;
};

//分析結果からLowAge (推測される年齢範囲の下限)取得
const getLowAge = (rekognizeResult: DetectFacesResponse): number => {
  return (rekognizeResult.FaceDetails as FaceDetailList)[0].AgeRange?.Low!;
};

//分析結果からHighAge(推測される年齢範囲の上限)取得
const getHighAge = (rekognizeResult: DetectFacesResponse): number => {
  return (rekognizeResult.FaceDetails as FaceDetailList)[0].AgeRange?.High!;
};

//分析結果からEyeglasses(サングラスを掛けているか)取得
const getIsWearingSunGlasses = (
  rekognizeResult: DetectFacesResponse
): boolean => {
  return (rekognizeResult.FaceDetails as FaceDetailList)[0].Sunglasses?.Value!;
};



export const Camera = () => {  
  const { resultData, setResultData } = useContext(rekognizeResults);
  const [facingMode, setFacingMode] = useState("user"); // userがフロントカメラ、environmentがリアカメラ

  // AWS.config.update({region:'ap-northeast-1'});
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      setRekognizeResult(undefined);
    }
    setCaptureEnable(false) // カメラオフ
  }, [webcamRef]);

  if (typeof window !== "undefined") {
    // windowを使う処理を記述
    window.Buffer = Buffer;
  }
  
  const [rekognizeResult, setRekognizeResult] = useState<DetectFacesResponse>();
  const rekognizeHandler = async () => {
    const result: DetectFacesResponse = await detectFaces(url as string);
    setRekognizeResult(result);
    setResultData(result);
    console.log(result);
  };

  const handleSwitchCamera = () => {
    setFacingMode((prevMode) => {
      // 前回のモードによって、次のモードを設定する
      if (prevMode === "user") {
        return "environment";
      } else {
        return "user";
      }
    });
  };

  const videoConstraints = {
    facingMode: facingMode // facingModeに設定することで、切り替えが可能になる
  };



  return (
    <>
    {/* <main className={styles.photoarea}> */}

    <header>

    <div className={styles.headerContainer}>
    <img onClick={handleSwitchCamera} src="/images/Rotate.svg" alt="カメラ切替"></img>
    </div>
    </header>
      {/* <header className={styles.text}>
        <h1>カメラアプリ （顔分析付き) </h1>
      </header> */}
      {/* {isCaptureEnable || (
        <button className={styles.startbutton}onClick={() => setCaptureEnable(true)}>開始</button>
      )} */}
      {isCaptureEnable && (
        <>
         {/* <div>
          <img className={styles.endbutton} onClick={() => setCaptureEnable(false)} src="/images/end.svg" alt="終了アイコン" />
         </div> */}
         {/* <> */}
         <div className={styles.cameraImage}>
          <Webcam
             audio={false}
             width={440}
             height={520}
             ref={webcamRef}
             screenshotFormat="image/jpeg"
             videoConstraints={videoConstraints}
            />
         </div>
        </>
        )}
        
        <footer>
        
        <div className={styles.footerContainer}>

        {isCaptureEnable && (
         <div className={styles.capturebutton}>
          <img onClick={capture} src="/images/CaptureButton.svg" alt="キャプチャボタン" />
         </div>)
        //  <p style={{ color: 'red' }}>false</p>
        }
      {/* )} */}
      {url && (
        <>
          {/* <img className={styles.returnbutton}
            onClick={() => {
              setUrl(null);
              setRekognizeResult(undefined);
              setCaptureEnable(true)  // カメラオン
            }}
            src="/images/Return.svg" alt="戻るボタン">
          </img> */}
         <div>
          <img src={url} alt="Screenshot" />
         </div>
         <div className={styles.container}>
         <img className={styles.returnbutton}
            onClick={() => {
              setUrl(null);
              setRekognizeResult(undefined);
              setCaptureEnable(true)  // カメラオン
            }}
            src="/images/Return.svg" alt="戻るボタン">
          </img>
          <Link href="/resultPage"> 
          <button className={styles.resultbutton} onClick={() => rekognizeHandler()}>Result</button>
          </Link>
          </div>
          
         {typeof rekognizeResult !== "undefined" && (
          <div className={styles.ageResult}>
            <div>{"Confidence: " + getConfidence(rekognizeResult)}</div>
            <div>
              {"AgeRange: " +
               getLowAge(rekognizeResult) +
               " ~ " +
               getHighAge(rekognizeResult)}
            </div>
            <div>
              {"Eyeglasses: " + getIsWearingSunGlasses(rekognizeResult)}
            </div>
            <div>
              {"Sunglasses: " + getIsWearingSunGlasses(rekognizeResult)}
            </div>
          </div>
         )}
       </>
      )}

    </div>

      </footer>
      {/* </main> */}
    </>
    );
  };
    

  export default Camera