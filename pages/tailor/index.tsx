import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import stores from '../../lib/stores/stores'
import Dropzone from 'react-dropzone'
import { IconDropbox, IconFolderGoogleDrive } from '../../components/Svg'
import { observer } from 'mobx-react-lite';
import Cropper from 'cropperjs';
export default function Tailor() {
  return (
    <Layout>
      <TailorPage />
    </Layout>
  )
}

const TailorPage = observer(() => {



  const onDrop = (e) => {
    if (e.length > 1) {
      console.log("最多只能处理一张")
    } else {
      stores.tailorStore.setImgData(e[0]);
      stores.tailorStore.onchangeIsShowChoseList(true);

      // console.log(cropper)
    }
  }


  return (
    <div className='flex flex-col items-center w-full h-full justify-center'>
      <div className={`flex flex-col items-center justify-center ${stores.tailorStore.isShowChoseList && 'h-full'}`}>
        {!stores.tailorStore.isShowChoseList &&
          <div>
            <p className='font-p36-ffffff-sem'>调整图像的大小</p>
            <p className='font-p20-FFFFFF-sem mt-9'>通过像素设定范围，裁剪<span className='font-p20-4C90FE-w600 italic'> JPG、</span><span className='font-p20-4C90FE-w600 italic'>PNG</span> 或 <span className='font-p20-4C90FE-w600 italic'>GIF</span>文件。</p>
            <p className='font-p20-FFFFFF-sem mt-4'>在线裁剪你的图像文件</p>
          </div>
        }
        {/* <img id='image' src='/1.jpeg' className='w-170.75'></img> */}
        <div className='flex-grow mt-3 mb-4.5'>
          {stores.tailorStore.isShowChoseList
            ?
            <TailorBlock />
            :
            <Dropzone onDrop={(e) => { onDrop(e) }}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button className='w-67 h-26 active:bg-blue-400 bg-nb-2F63AE rounded-4.5'>
                      <p className='font-p26-FFFFFF-w700'>选择一张张图片</p>
                      <p className='font-p15-FFFFFF-w400 mt-2.75'>或者将一张图片拖动到这里</p>
                    </button>
                  </div>
                </section>
              )}
            </Dropzone>
          }
        </div>


        {!stores.tailorStore.isShowChoseList &&
          <>
            <p className='font-p15-f9f9f9-re mb-5.75'>Or</p>
            <div className='flex flex-row'>
              <button className='w-10.5 h-10.5 rounded-full bg-nb-2F63AE flex items-center justify-center'><IconFolderGoogleDrive /></button>
              <button className='w-10.5 h-10.5 ml-5 rounded-full bg-nb-2F63AE flex items-center justify-center'><IconDropbox /></button>
            </div>
          </>
        }
      </div>
    </div>
  )
})

const TailorBlock = observer(() => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img:any = document.getElementById("cropper-container");
      const cropper = new Cropper(img, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false,
        crop(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      })
    }
  }, [])
  return (
    <div className='h-full flex flex-col items-center'>
      <div className='w-187.5 h-20 flex-none bg-nb-2E2F30'>ADs</div>
      <div className='w-170.75 flex-grow mt-3.5 '>
        <img src={URL.createObjectURL(stores.tailorStore.imgData)} id='cropper-container' className='hidden' />
      </div> 
    </div>
  )
})

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'subscrible']),
  },
})