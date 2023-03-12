import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {  GoogleOAuthProvider } from '@react-oauth/google';


const App = ({ Component, pageProps }: AppProps) => {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if(isSSR) return null;

  return (
      <GoogleOAuthProvider clientId={`312456333734-18sjqv70g1259s1l06klf6ja1ak9fsr9.apps.googleusercontent.com`}>
          <div>
            <Navbar />
            <div className="flex gap-6 md:gap-20">
              <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
                <Sidebar />
              </div>
              <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
                <Component {...pageProps} />
              </div>
            </div>
          </div>
      </GoogleOAuthProvider>
  )
}

export default App
