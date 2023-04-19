
import { ImageResponse } from '@vercel/og'
import styles from '../../styles/dg.module.css'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler() {
  const [robotoData, mplusData] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2'
    ).then((res) => res.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/mplus1p/v14/e3tleu03ZqcP9PbSXDGHvAzyDMXhdD8sAj6OAJTFsNM.woff2'
    ).then((res) => res.arrayBuffer()),
  ]);

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
          fontFamily: 'M PLUS 1p, Roboto, sans-serif',
          fontWeight: 700,
        }}
      >
        MyAge 顔診断
      </div>
    ),
    {
      fonts: [
        {
          name: 'M PLUS 1p',
          data: mplusData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: robotoData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}

// export default async function handler() {
//   const fontData = await fetch(
//     new URL('../../assets/Roboto-Bold.ttf', import.meta.url)
//   ).then((res) => res.arrayBuffer())

//   return new ImageResponse(
//     (
      
//       <div
      
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#869ef5',
//           fontSize: '128px',
//           fontFamily: '"Roboto"',
//         }}
//       >
//         MyAge 顔診断
//       </div>
//     ),
//     {
//       fonts: [
//         {
//           name: 'Roboto',
//           data: fontData,
//           weight: 700,
//           style: 'normal',
//         },
//       ],
//     }
//   )
// }