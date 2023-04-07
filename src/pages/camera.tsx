import { useRef, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import styles from "../styles/camera.module.css";
import {
  DetectFacesRequest,
  DetectFacesResponse,
  FaceDetailList,
} from "aws-sdk/clients/rekognition";
import AWS from "aws-sdk";


import { ClassNames } from '@emotion/react';

import { Buffer } from 'buffer';

// @ts-ignore
// window.Buffer = Buffer;



const videoConstraints = {
  width: 540,
  height: 720,
  facingMode: "user",
};

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
  // AWS.config.update({region:'ap-northeast-1'});
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      setRekognizeResult(undefined);
    }
  }, [webcamRef]);

  if (typeof window !== "undefined") {
    // windowを使う処理を記述
    window.Buffer = Buffer;
  }
  
  const [rekognizeResult, setRekognizeResult] = useState<DetectFacesResponse>();
  const rekognizeHandler = async () => {
    const result: DetectFacesResponse = await detectFaces(url as string);
    setRekognizeResult(result);
    console.log(result);
  };

  return (
    <>
    <main className='photoarea'>

    
      <header>
        <h1>カメラアプリ （顔分析付き) </h1>
      </header>
      {isCaptureEnable || (
        <button className={styles.startbutton}onClick={() => setCaptureEnable(true)}>開始</button>
      )}
      {isCaptureEnable && (
        <>
         <div>
          <button className={styles.endbutton} onClick={() => setCaptureEnable(false)}>終了</button>
         </div>
         <div>
          <Webcam
             audio={false}
             width={414}
             height={552}
             ref={webcamRef}
             screenshotFormat="image/jpeg"
             videoConstraints={videoConstraints}
            />
         </div>
         <button className={styles.capturebutton}onClick={capture}></button>
         <button className={styles.outer_capturebutton}></button>
        </>
      )}
      {url && (
        <>
         <div>
          <button
            onClick={() => {
              setUrl(null);
              setRekognizeResult(undefined);
            }}
          >
            削除
          </button>
          <button onClick={() => rekognizeHandler()}>分析</button>
         </div>
         <div>
          <img src={url} alt="Screenshot" />
         </div>
         {typeof rekognizeResult !== "undefined" && (
          <div>
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
      </main>
    </>
    );
  };
    

  export default Camera