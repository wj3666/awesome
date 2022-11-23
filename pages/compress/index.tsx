import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Dropzone from 'react-dropzone'
import { NBString } from '../../lib/util/tools'
import stores from '../../lib/stores/stores'
import { IconDropbox, IconFolderGoogleDrive } from '../../components/Svg'
import IconButton from '../../components/IconButton'

const Compress = () => {
  useEffect(() => {
    stores.compressStore.init()
  }, [])
  return (
    <>
      <Layout>
        <CompressPage />
      </Layout>
    </>
  )
}
const CompressPage = observer(() => {
  const onDrop = (e) => {
    stores.compressStore.setImgListData(e);
    stores.compressStore.changeIsShowChoseList(true);
  }


  return (
    <div className='flex flex-row justify-between h-full'>
      <div className='flex-grow flex flex-col items-center w-full h-full justify-between'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          {stores.compressStore.imgListData.length == 0 &&
            <div>
              <p className='font-p36-ffffff-sem'>压缩图像文件</p>
              <p className='font-p20-FFFFFF-sem mt-10.5'>压缩<span className='font-p20-4C90FE-w600 italic'>JPG、</span><span className='font-p20-4C90FE-w600 italic'>PNG、</span><span className='font-p20-4C90FE-w600 italic'>SVG</span>或<span className='font-p20-4C90FE-w600 italic'>GIF</span>，并保持最佳的质量批量缩小多个图片尺寸</p>
            </div>
          }

          <div className='mt-12.5 mb-4.5'>
            {stores.compressStore.imgListData.length != 0 ?
              <CompressBlock />
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
                <IconButton icon={<IconFolderGoogleDrive />}/>
                <IconButton className='ml-5' icon={<IconDropbox />}/>
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

const CompressBlock = () => {
  return (
    <div className='mb-22'>
      {stores.compressStore.imgListData.length > 1 ?
        <div className='grid grid-cols-2 gap-x-5 gap-y-6.75'>
          {stores.compressStore.imgListData.map((item, idx) => {
            return (
              <ImgInfo key={item.name + idx} item={item} idx={idx} />
            )
          })}
        </div>
        :
        <>
          {stores.compressStore.imgListData.map((item, idx) => {
            return (
              <ImgInfo key={item.name + idx} item={item} idx={idx} />
            )
          })
          }
        </>
      }
    </div>
  )
}

const ImgInfo = observer(({ item, idx }) => {
  return (
    <div className='w-85 h-82.75'>
      <div className='w-full h-75.5 p-1.5 rounded-md bg-nb-222325 shadow-card'>
        <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
      </div>
      <div className='mt-3 mb-0.75 flex justify-between font-p12-ffffff-re'>
        <p>{NBString.truncateString(item.name, 18, 6)}</p>

        <p className={`${NBString.getImgSizeMb(item.size) >= 5 && "line-through text-nb-F45D47"}`}>{NBString.getImgSizeUnit(item.size) ? NBString.getImgSize(item.size) + "Mb" : NBString.getImgSize(item.size) + "Kb"} {stores.compressStore.process.length != 0 && NBString.getImgSizeMb(stores.compressStore.imgListData[idx].size) < 5 && <>
          &gt; {NBString.getImgSizeUnit(stores.compressStore.imgListCompressData[idx]?.size) ? NBString.getImgSize(stores.compressStore.imgListCompressData[idx]?.size) + "Mb" : NBString.getImgSize(stores.compressStore.imgListCompressData[idx]?.size) + "Kb"}
        </>
        }
        </p>
      </div>
    </div>
  )
})

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
export default observer(Compress)
