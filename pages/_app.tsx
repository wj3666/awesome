import '../styles/globals.css'
import React from 'react'
import 'tailwindcss/tailwind.css'
import { observer } from 'mobx-react'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />

  )
}


export default appWithTranslation(observer(MyApp)) 
