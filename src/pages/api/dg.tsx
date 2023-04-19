
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
          backgroundColor: 'white',
          fontSize: '128px',
        }}
      >
        <h1>MyAge 顔診断</h1>
      </div>
    )
  )
}