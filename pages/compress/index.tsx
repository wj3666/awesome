import { observer } from 'mobx-react'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Dropzone from 'react-dropzone'
import { NBString } from '../../lib/util/tools'
import { IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive } from '../../components/Svg'
import stores from '../../lib/stores/stores'

const Compress = () => {
  return (
    <>
      <Layout>
        <CompressBlock />
        {/* <Chosen /> */}
      </Layout>
    </>
  )
}
const CompressBlock = observer(() => {
  const onDrop = (e) => {
    // console.log(e)
    
    stores.compressStore.setImgListData(e);
    stores.compressStore.changeIsShowChoseList(true);
  }


  return (
    <div className='flex flex-row justify-between h-full'>
      <div className='flex-grow flex flex-col items-center w-full h-full justify-between'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          {stores.compressStore.imgListData.length == 0 &&
            <div>
              <div className='font-p36-ffffff-sem'>压缩图像文件</div>
              <div className='font-p20-FFFFFF-sem mt-10.5'>压缩<span className='font-p20-4C90FE-sem italic'>JPG</span>、<span className='font-p20-4C90FE-sem italic'>PNG</span>、<span className='font-p20-4C90FE-sem italic'>SVG</span>或<span className='font-p20-4C90FE-sem italic'>GIF</span>，并保持最佳的质量批量缩小多个图片尺寸</div>
            </div>
          }

          <div className='mt-12.5 mb-4.5'>
            {stores.compressStore.imgListData.length != 0 ?
              <div className='mb-22'>
                {stores.compressStore.imgListData.length > 1 ?
                  <div className='grid grid-cols-2 gap-x-5 gap-y-6.75'>
                    {stores.compressStore.imgListData.map((item, idx) => {
                      return (
                        <div key={item.name + idx} className='w-85 h-82.75'>
                          <div className='w-full h-75.5 p-1.5 rounded-md bg-nb-222325 shadow-card'>
                            <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                          </div>
                          <div className='mt-3 mb-0.75 flex justify-between font-p12-ffffff-re'>
                            <p>{NBString.truncateString(item.name, 18, 6)}</p>
                            <p>{NBString.getImgSizeMb(item.size)}Mb</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  :
                  <>
                    {stores.compressStore.imgListData.map((item, idx) => {
                      return (
                        <div key={item.name + idx} className='w-85 h-82.75'>
                          <div className='w-full h-75.5 p-1.5 rounded-md bg-nb-222325 shadow-card'>
                            <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                          </div>
                          <div className='mt-3 mb-0.75 flex justify-between font-p12-ffffff-re'>
                            <p>{item.name}</p>
                            <p>{(item.size / 1024 / 1024).toFixed(2)}Mb</p>
                          </div>
                        </div>
                      )
                    })}
                  </>}
              </div>
              :
              <Dropzone onDrop={(e) => { onDrop(e) }}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button className='w-67 h-26 active:bg-blue-400 bg-nb-2F63AE rounded-4.5'>
                        <p className='font-p26-FFFFFF-w700'>选择多张图片</p>
                        <p className='font-p15-FFFFFF-w400 mt-2.75'>或者将多个图片拖动到这里</p>
                      </button>
                    </div>
                  </section>
                )}
              </Dropzone>
            }
          </div>


          {stores.compressStore.imgListData.length == 0 &&
            <>
              <p className='font-p15-f9f9f9-re mb-5.75'>Or</p>
              <div className='flex flex-row'>
                <button className='mr-5'><Ellipse1 /></button>
                <button><Ellipse2 /></button>
              </div>
            </>
          }
        </div>
        <div className='flex-none w-187.5 h-27.25 bottom-0 bg-nb-2E2F30 text-safe'>
          ADs
        </div>
      </div>

    </div>
  )
})


const Ellipse1 = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#2F63AE" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21 13.6H31.4C32.0896 13.6 32.7509 13.8739 33.2385 14.3615C33.7261 14.8491 34 15.5104 34 16.2V29.2C34 29.8896 33.7261 30.5509 33.2385 31.0385C32.7509 31.5261 32.0896 31.8 31.4 31.8H10.6C9.91044 31.8 9.24912 31.5261 8.76152 31.0385C8.27393 30.5509 8 29.8896 8 29.2V13.6C8 12.157 9.157 11 10.6 11H18.4L21 13.6ZM26.382 17.5H23.275L22.95 18.098L26.265 24H30.1L26.382 17.5ZM21.975 27.9H29.19L30.789 25.248L30.451 24.65H23.795L21.975 27.9ZM20.35 27.9L18.92 25.118L22.612 18.67L24.562 22.128L21.325 27.9H20.35Z" fill="white" />
  </svg>

)
const Ellipse2 = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#2F63AE" />
    <path fillRule="evenodd" clipRule="evenodd" d="M15.6483 9L21 13.1958L13.2888 17.6667L8 13.6898L15.6483 9ZM21 13.1958L28.7112 17.6667L34 13.6898L26.3517 9L21 13.1958ZM8 22.7269L13.2888 18.75L21 23.2209L15.6483 27.4167L8 22.7269ZM28.7112 18.75L21 23.222L26.3517 27.4167L34 22.7269L28.7112 18.75ZM21 24.1667L26.3105 28.3483L28.5833 26.94V28.5184L21 32.8333L13.4167 28.5184V26.94L15.6895 28.3483L21 24.1667Z" fill="white" />
  </svg>

)
const Ellipse3 = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#2F63AE" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9.85714 11H32.1429C32.617 11 33 11.3844 33 11.8602V25.1935C33 25.6694 32.617 26.0538 32.1429 26.0538H21.9643V29.0645H26.5714C26.8071 29.0645 27 29.2581 27 29.4946V30.7849C27 30.9032 26.9036 31 26.7857 31H15.2143C15.0964 31 15 30.9032 15 30.7849V29.4946C15 29.2581 15.1929 29.0645 15.4286 29.0645H20.0357V26.0538H9.85714C9.38304 26.0538 9 25.6694 9 25.1935V11.8602C9 11.3844 9.38304 11 9.85714 11ZM10.9286 24.1183H31.0714V12.9355H10.9286V24.1183Z" fill="white" />
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
