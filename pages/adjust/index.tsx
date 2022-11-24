import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Dropzone from 'react-dropzone'
import { NBString } from '../../lib/util/tools'
import { IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive, Ellipse1, Ellipse2 } from '../../components/Svg'
import stores from '../../lib/stores/stores'

const Adjust = () => {
  return (
    <>
      <Layout>
        <AdujstBlock />
      </Layout>
    </>
  )
}
const AdujstBlock = observer(() => {
  const onDrop = (e) => {
    // console.log("ee", e)
    stores.adjustStore.setImgListData(e);
    stores.adjustStore.changeIsShowChoseList(true);
      getImageWH(e)
  }
  const getImageWH = async (e) => {
    for (let i = 0; i < e.length; i++) {
      let width = await NBString.getImgWidth(e[i])
      let height = await NBString.getImgHeight(e[i])
      stores.adjustStore.setDimensionsWidth(width)
      stores.adjustStore.setDimensionsHeight(height)
    }
  }
  useEffect(()=>{
     stores.adjustStore.init()

  },[])
  return (
    <div className='flex flex-row justify-between h-full'>
      <div className='flex-grow flex flex-col items-center w-full h-full justify-between'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          {stores.adjustStore.imgListData.length == 0 &&
            <div>
              <div className='font-p36-FFFFFF-w600'>调整图像的大小</div>
              <div className='font-p20-FFFFFF-w400  mt-10.5 w-147'>通过设定新的高度和宽度来调<span className='font-p20-4C90FE-w600 italic'>JPG</span>、<span className='font-p20-4C90FE-w600 italic'>PNG</span>、<span className='font-p20-4C90FE-w600 italic'>SVG</span>或<span className='font-p20-4C90FE-w600 italic'>GIF文件</span>的尺寸。 可一次调整多个图像文件的尺寸</div>
            </div>
          }

          <div className='mt-12.5 mb-4.5'>
            {stores.adjustStore.imgListData.length != 0 ?
              <div className='mb-22'>
                {stores.adjustStore.imgListData.length > 1 ?
                  <div className='grid grid-cols-2 gap-x-5 gap-y-6.75'>
                    {stores.adjustStore.imgListData.map((item, idx) => {
                      return (
                        <div key={item.name + idx} className='w-85 h-82.75'>
                          <div className='w-full h-75.5 p-1.5 rounded-md bg-nb-222325 shadow-card'>
                            <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                          </div>
                          <div className='mt-3 mb-0.75 flex flex-col items-start font-p12-FFFFFF-w400'>
                            <p>{NBString.truncateString(item.name, 18, 6)}</p>
                            <div className='flex flex-row items-center justify-around bg-red-700 w-85 h-9 font-p13-CFD0E4-sem'>
                              <p className='leading-8 w-36.5 h-9 bg-nb-2E2F30 rounded-lg'>{stores.adjustStore.initialWidth[idx]}*{stores.adjustStore.initialHeight[idx]}<span className='font-p13-CFD0E4-sem ml-2'>px</span></p>
                              <Arrow />
                              <p className='leading-8 w-36.5 h-9 bg-nb-2F63AE rounded-lg '>{stores.adjustStore.dimensionsWidth[idx]}*{stores.adjustStore.dimensionsHeight[idx]}<span className='font-p13-CFD0E4-sem ml-2'>px</span></p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  :
                  <>
                    {stores.adjustStore.imgListData.map((item, idx) => {
                      return (
                        <div key={item.name + idx} className='w-85 h-82.75'>
                          <div className='w-full h-75.5 p-1.5 rounded-md bg-nb-222325 shadow-card'>
                            <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                          </div>
                          <div className='mt-3 mb-0.75 flex flex-col items-start font-p12-ffffff-re'>
                            <p>{item.name}</p>
                            <div className='flex flex-row items-center justify-around w-85 h-9 font-p13-CFD0E4-sem'>
                              <p className='leading-8 w-36.5 h-9 bg-nb-2E2F30 rounded-lg'>{stores.adjustStore.initialWidth[idx]}*{stores.adjustStore.initialHeight[idx]}<span className='font-p13-CFD0E4-sem ml-2'>px</span></p>
                              <Arrow />
                              <p className='leading-8 w-36.5 h-9 bg-nb-2F63AE rounded-lg '>{stores.adjustStore.dimensionsWidth[idx]}*{stores.adjustStore.dimensionsHeight[idx]}<span className='font-p13-CFD0E4-sem ml-2'>px</span></p>
                            </div>
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
          {stores.adjustStore.imgListData.length == 0 &&
            <>
              <p className='font-p15-FFFFFF-w400 mb-5.75'>Or</p>
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
const Arrow = () => (
  <svg width="17" height="6" viewBox="0 0 17 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2.5C0.723858 2.5 0.5 2.72386 0.5 3C0.5 3.27614 0.723858 3.5 1 3.5V2.5ZM17 3L12 0.113249V5.88675L17 3ZM1 3.5H12.5V2.5H1V3.5Z" fill="#A2A3BA" />
  </svg>

)
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
export default observer(Adjust)
