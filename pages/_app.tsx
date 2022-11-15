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
// MyApp.getInitialProps = async ({ ctx }) => {
//   const {out_trade_no,trade_no}=ctx.req.query
//   console.log(out_trade_no,trade_no)
//   return {}
// }

export default appWithTranslation(observer(MyApp)) 
