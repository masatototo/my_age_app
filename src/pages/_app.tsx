import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react'

export const rekognizeResults = createContext<any>(null)

function App({ Component, pageProps }: AppProps) {
  const [resultData, setResultData] = useState()
  const value = {
    resultData,
    setResultData,
  };

  return (
  <>
    <rekognizeResults.Provider value={value}>
    <Component {...pageProps} />
  </rekognizeResults.Provider>
  </>
)};

export default App