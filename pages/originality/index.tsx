import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export default function c() {
  return (
   <Layout></Layout>
  )
}
export const getStaticProps = async ({ locale }) => ({
  props: {
      ...await serverSideTranslations(locale, ['common', 'subscrible']),
  },
})