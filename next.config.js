/** @type {import('next').NextConfig} */

const { redirect } = require('next/dist/server/api-utils')
const { i18n } = require('./next-i18next.config')
module.exports = {
  i18n,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  // experimental: {
  //   // allowMiddlewareResponseBody: true,
  // },
  // trailingSlash: true,
  
}


