import { observer } from 'mobx-react'
import React from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Compress = () => {
  return (
    <>
      <Layout>
        {/* <Choice /> */}
        <Chosen />
      </Layout>
    </>
  )
}
const Choice = () => {
  return (
    <>
      <div className='flex flex-col items-center mt-23 w-full h-full  '>
        <div className='flex flex-col items-center  1600sc:mt-50 justify-around h-96 w-200  '>
          <div className='font-p36-ffffff-sem '>压缩图像文件</div>
          <div className='font-p20-FFFFFF-sem'>压缩<span className='font-p20-4C90FE-sem'>JPG</span>、<span className='font-p20-4C90FE-sem'>PNG</span>、<span className='font-p20-4C90FE-sem'>SVG</span>或<span className='font-p20-4C90FE-sem'>GIF</span>，并保持最佳的质量批量缩小多个图片尺寸</div>
          <div className='flex flex-col items-center justify-around w-67 h-26 -space-y-8 rounded-3xl bg-nb-2F63AE'>
            <p className='font-p26-FFFFFF-sem'>选择多张图片</p>
            <p className='font-p15-f9f9f9-re'>或者将多个图片拖动到这里 </p>
          </div>
          <p className='font-p15-f9f9f9-re'>Or</p>
          <div className='flex flex-row justify-around w-26 h-10.5 '>
            <div><Ellipse1 /></div>
            <div><Ellipse2 /></div>
          </div>
        </div>
        <div className='flex flex-row w-187 h-27.25 fixed bottom-0 bg-nb-2E2F30 items-center justify-center   '>
          ADs
        </div>
      </div>
    </>
  )
}
const Chosen = () => {
  return (
    <>
      <div className='flex flex-row justify-start mt-23 w-full h-full '>
        <div className='flex flex-wrap itmens-start justify-center  w-11/12 h-full bg-black'>
          <div className='flex flex-row w-187 h-27.25 fixed bottom-0 bg-nb-2E2F30 items-center justify-center   '>
            ADs
          </div>
        </div>
        <div className='flex flex-col items-center w-72.5 h-full '>
          <div className='flex flex-col text-left justify-center space-y-4 w-full h-30 '>
            <p className='font-p26-FFFFFF-sem'>压缩图像文件</p>
            <p className='w-5/6 font-p15-f9f9f9-re'>所有图片都将被压缩，同时保持最佳质量和大小比例 </p>
          </div>
          <div className='w-4/5 border border-black '></div>
          <div className='flex flex-col w-full items-start h-25  '>
            <div className='flex flex-row font-p15-f9f9f9-re '><Add /><span>{`\xa0\xa0` + `选择添加更多图片`}</span></div>
            <div className='flex flex-row w-3/5 mt-4 justify-around  '>
            <button className='cursor-default'><Ellipse1/></button>
            <button className='cursor-default'><Ellipse2/></button>
            <button className='cursor-default'><Ellipse3/></button>
            </div>
          </div>
          <div className='w-4/5 border border-black '></div>
          <div>
            
          </div>
        </div>
      </div>
    </>
  )
}
const Ellipse1 = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#2F63AE" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21 13.6H31.4C32.0896 13.6 32.7509 13.8739 33.2385 14.3615C33.7261 14.8491 34 15.5104 34 16.2V29.2C34 29.8896 33.7261 30.5509 33.2385 31.0385C32.7509 31.5261 32.0896 31.8 31.4 31.8H10.6C9.91044 31.8 9.24912 31.5261 8.76152 31.0385C8.27393 30.5509 8 29.8896 8 29.2V13.6C8 12.157 9.157 11 10.6 11H18.4L21 13.6ZM26.382 17.5H23.275L22.95 18.098L26.265 24H30.1L26.382 17.5ZM21.975 27.9H29.19L30.789 25.248L30.451 24.65H23.795L21.975 27.9ZM20.35 27.9L18.92 25.118L22.612 18.67L24.562 22.128L21.325 27.9H20.35Z" fill="white" />
  </svg>

)
const Ellipse2 = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#2F63AE" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6483 9L21 13.1958L13.2888 17.6667L8 13.6898L15.6483 9ZM21 13.1958L28.7112 17.6667L34 13.6898L26.3517 9L21 13.1958ZM8 22.7269L13.2888 18.75L21 23.2209L15.6483 27.4167L8 22.7269ZM28.7112 18.75L21 23.222L26.3517 27.4167L34 22.7269L28.7112 18.75ZM21 24.1667L26.3105 28.3483L28.5833 26.94V28.5184L21 32.8333L13.4167 28.5184V26.94L15.6895 28.3483L21 24.1667Z" fill="white" />
  </svg>

)
const Ellipse3 = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#2F63AE" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.85714 11H32.1429C32.617 11 33 11.3844 33 11.8602V25.1935C33 25.6694 32.617 26.0538 32.1429 26.0538H21.9643V29.0645H26.5714C26.8071 29.0645 27 29.2581 27 29.4946V30.7849C27 30.9032 26.9036 31 26.7857 31H15.2143C15.0964 31 15 30.9032 15 30.7849V29.4946C15 29.2581 15.1929 29.0645 15.4286 29.0645H20.0357V26.0538H9.85714C9.38304 26.0538 9 25.6694 9 25.1935V11.8602C9 11.3844 9.38304 11 9.85714 11ZM10.9286 24.1183H31.0714V12.9355H10.9286V24.1183Z" fill="white" />
  </svg>

)
const Add = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 9H17" stroke="#E4E4E4" stroke-width="1.5" stroke-linecap="square" />
    <path d="M9 1L9 17" stroke="#E4E4E4" stroke-width="1.5" stroke-linecap="square" />
  </svg>

)
export const getStaticProps = async ({ locale }) => ({
  props: {
      ...await serverSideTranslations(locale, ['common']),
  },
})
export default observer(Compress)
