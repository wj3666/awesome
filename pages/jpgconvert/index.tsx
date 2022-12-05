import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Dropzone from 'react-dropzone'
import { NBString } from '../../lib/util/tools'
import stores from '../../lib/stores/stores'
import { IconDropbox, IconFolderGoogleDrive ,BackAddimage} from '../../components/Svg'
import IconButton from '../../components/IconButton'

const ConvertJpg = () => {
  useEffect(() => {
    stores.jpgConvertStore.init()
  }, [])
  return (
    <>
      <Layout>
        <JpgConvertPage />
      </Layout>
    </>
  )
}
const JpgConvertPage = observer(() => {
  const onDrop = (e) => {
    let fileFormat = e[0].name.split('.')[1]
    if (fileFormat == 'jpg' || fileFormat == 'jpeg') {
      stores.jpgConvertStore.setImgListData(e);
      stores.jpgConvertStore.changeIsShowChoseList(true);
    } else {
      alert('请导入正确格式的图片')
      return
    }
  }
  return (
    <div className='flex flex-row justify-between h-full'>
      {
        stores.jpgConvertStore.process.length != 0 ?
          <div className='fixed mt-12 ml-5'>
            <button className="mt-4 w-17.5 h-8.5 bg-nb-2F63AE rounded-lg flex flex-row justify-center items-center space-x-1   font-p14-FFFFFF-w500"
              onClick={() => {
                stores.jpgConvertStore.changeIsShowChoseList(false)
                stores.jpgConvertStore.init()
              }}
            ><BackAddimage /><p>返回</p></button>
          </div>
          : ""
      }
      <div className='flex-grow flex flex-col items-center w-full h-full justify-between'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          {stores.jpgConvertStore.imgListData.length == 0 &&
            <div>
              <p className='font-p36-FFFFFF-w600it'>JPG文件转换至</p>
              <p className='font-p20-FFFFFF-w400 mt-9 leading-10 w-90'>转换JPG<span className='font-p20-4C90FE-w600 italic'>PNG, GIF</span>格式。</p>
              <p className='font-p20-FFFFFF-w400  w-90'>在线批量转换多个<span className='font-p20-4C90FE-w600 italic'>JPG</span>至<span className='font-p20-4C90FE-w600 italic'>其他图像文件</span></p>
            </div>
          }

          <div className='mt-12.5 mb-4.5'>
            {stores.jpgConvertStore.imgListData.length != 0 ?
              <ConvertJpgBlock />
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


          {stores.jpgConvertStore.imgListData.length == 0 &&
            <>
              <p className='font-p15-FFFFFF-w400 mb-5.75'>Or</p>
              <div className='flex flex-row'>
                <IconButton icon={<IconFolderGoogleDrive />} />
                <IconButton className='ml-5' icon={<IconDropbox />} />
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

const ConvertJpgBlock = () => {
  return (
    <div className='mb-22'>
      {stores.jpgConvertStore.imgListData.length > 1 ?
        <div className='grid grid-cols-2 gap-x-5 gap-y-6.75'>
          {stores.jpgConvertStore.imgListData.map((item, idx) => {
            return (
              <ImgInfo key={item.name + idx} item={item} idx={idx} />
            )
          })}
        </div>
        :
        <>
          {stores.jpgConvertStore.imgListData.map((item, idx) => {
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
      <div className='mt-3 mb-0.75 flex justify-between font-p12-FFFFFF-w400'>
        <p>{NBString.truncateString(item.name, 18, 6)}</p>

        <p className={`${stores.appStore.userPrivilege ? "" : NBString.getImgSizeMb(item.size) >= 5 && "line-through text-nb-F45D47"}`}>{NBString.getImgSizeUnit(item.size) ? NBString.getImgSize(item.size) + "Mb" : NBString.getImgSize(item.size) + "Kb"} {stores.compressStore.process.length != 0 && NBString.getImgSizeMb(stores.compressStore.imgListData[idx].size) < 5 && <>
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
export default observer(ConvertJpg)
