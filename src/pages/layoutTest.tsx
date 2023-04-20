import styles from '../styles/layout.module.css'
import Webcam from "react-webcam";
import { useRef } from 'react';
import { isMobile } from 'react-device-detect';


export const HomePage = () => {
    const webcamRef = useRef<Webcam>(null);

    return (
        <>
            <div className={styles.div1}></div>
            <div className={styles.div2}>
                <Webcam
                audio={false}
                width={'100%'}
                // height={'100%'}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
                videoConstraints={(isMobile) ? {facingMode:{exact:"environment"}} : {facingMode:"user"}}
                />
            </div>
            <div className={styles.div3}></div>
        </>
    )
}

export default HomePage