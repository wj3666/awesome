import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Layout from '../../components/Layout'

export default function index() {
  return (
   <Layout></Layout>
  )
}
export const getStaticProps = async ({ locale }) => ({
  props: {
      ...await serverSideTranslations(locale, ['common', 'subscrible']),
  },
})