
import { ImageResponse } from '@vercel/og'
import styles from '../../styles/dg.module.css'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler() {
  return new ImageResponse(
    (
      
      <div
      
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#869ef5',
          fontSize: '128px',
        }}
      >
        MyAge 顔診断
      </div>
      
    )
  )
}