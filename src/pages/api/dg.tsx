
import { ImageResponse } from '@vercel/og'
import styles from '../../styles/dg.module.css'

export const config = {
  runtime: 'experimental-edge',
}


export default async function handler() {
  const fontData = await fetch(
    new URL('../../assets/Roboto-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

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
          fontFamily: '"Roboto"',
        }}
      >
        MyAge 顔診断
      </div>
    ),
    {
      fonts: [
        {
          name: 'Roboto',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )
}