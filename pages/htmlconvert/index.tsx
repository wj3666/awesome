import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import stores from '../../lib/stores/stores'
import { NBString } from '../../lib/util/tools'


const Index = () => {
  useEffect(() => {
    // stores.convertJpgStore.init()
  }, [])
  return (
    <>
      <Layout>
        <HtmlConvert />
      </Layout>
    </>
  )
}
const HtmlConvert = observer(() => {
  const openHtml = () => {
    stores.htmlconvertStore.setIsShowChoseList(true)
    stores.htmlconvertStore.upload(stores.htmlconvertStore.htmlData,stores.htmlconvertStore.browserWidth)
  }
  useEffect(()=>{
    var htmlWidth=document.documentElement.clientWidth
    stores.htmlconvertStore.setBrowserWidth(htmlWidth)
  })
  return (
    <div className='flex flex-row justify-between h-full'>
      <div className='flex-grow flex flex-col items-center w-full h-full justify-between'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          {stores.convertJpgStore.imgListData.length == 0 &&
            <div>
              <p className='font-p36-FFFFFF-w600'>HTML转图片</p>
              <p className='font-p20-FFFFFF-w400 mt-10.5 leading-10 w-156'>将网页转换为<span className='font-p20-4C90FE-w600 italic'>PNG, GIF, SVG</span>格式图片</p>
            </div>
          }

          <div className='flex flex-col  items-start mt-12.5 mb-4.5 space-y-1'>
            {
              // stores.htmlconvertStore.htmlData != '' ? ""
              //   :
              <>
                <p className='font-p14-FFFFFF-w400'>输入网站的URL</p>
                <input className='w-199 h-12 bg-html-logo bg-no-repeat bg-nb-sidebar-grey bg-left-2 font-p15-F9F9F9-w400 px-10 focus:outline-none rounded-xl' placeholder='URL地址' value={stores.htmlconvertStore.htmlData}
                  onChange={(e) => stores.htmlconvertStore.setHtmlData(e.target.value)}
                />
                <p className='font-p13-EA472B-w400 '>这个URL链接无效，请检查其书写是否正确。</p>
              </>
            }
          </div>
          <button className='rounded-2xl bg-nb-2F63AE w-41 h-10.5 font-p18-FFFFFF-w900 mt-12'
            onClick={() => {
              if (stores.htmlconvertStore.htmlData == '') {
                return
              } {
                openHtml()
              }
            }}
          >添加 HTML</button>
        </div>
        <div className='flex-none w-187.5 h-27.25 bottom-0 bg-nb-2E2F30 text-safe'>
          ADs
        </div>
      </div>

    </div>
  )
})




export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
export default observer(Index)
