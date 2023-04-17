import { ImageResponse } from '@vercel/og'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')?.slice(0, 100) ?? 'error'
  
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
       {id}
      </div>
    )
  )
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message)
  }
  return new Response(`Failed to generate the image`, {
    status: 500,
  })
}
}

// https://zenn.dev/monicle/articles/f02e4a12da960b
// https://unique1.co.jp/column/sns_operation/3033/