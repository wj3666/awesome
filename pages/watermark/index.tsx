import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
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
