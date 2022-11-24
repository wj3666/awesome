import '../styles/globals.css'
import React from 'react'
import 'tailwindcss/tailwind.css'
import { observer } from 'mobx-react'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import 'cropperjs/dist/cropper.css'

function MyApp({ Component, pageProps:{session,...pageProps}}:AppProps) {
  return (
    <SessionProvider  session={session}>
    <Component {...pageProps} />
    </SessionProvider>

  )
}


export default appWithTranslation(observer(MyApp)) 
