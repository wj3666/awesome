import React from 'react'
import Layout from '../../components/Layout'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Compress,Adjust,Tailor,Convertjpg,Jpgconvert,Imgedit,Watermark,Originality,Rotate,Htmlconvert} from '../../components/Svg'
import { useTranslation } from 'next-i18next'
const Home = () => {
  return (
    <>
      <Layout>
        <Allcategory />
      </Layout>

    </>
  )
}
const Allcategory = () => {
  const  router=useRouter()
  const {t}=useTranslation('common')
  const funcModel = {
    model: [
      {
        id: 1,
        svg: <Compress />,
        url:"/compress",
        name: "压缩图像文件",
        content: "压缩JPG、PNG、SVG，以及GIF，同时节省空间，保持图片质量。"
      },
      {
        id: 2,
        svg:<Adjust/>,
        url:"/adjust",
        name:"调整图像大小",
        content:"按照百分比或像素自定义尺寸，并调整JPG、PNG、SVG以及GIF图片的尺寸。",
      },
      {
        id: 3,
        svg:<Tailor/>,
        url:"/tailor",
        name:"裁剪图片",
        content:"通过设定像素来裁剪图像文件。可裁剪JPG、PNG或GIF图像文件。"
      },
      {
        id: 4,
        svg:<Convertjpg/>,
        url:"/convertjpg",
        name:"转换至JPG文件",
        content:"轻松的批量转换PNG、GIF、TIG、PSD、SVG、WEBP、HEIC或 原始 图像文件。"
      },
      {
        id: 5,
        svg:<Jpgconvert/>,
        url:"/jpgconvert",
        name:"JPG文件转换",
        content:"转换JPG图像文件至PNG或GIF格式，用多个JPG文件创建一个GIF动画文件。"
      },
      {
        id: 6,
        svg:<Imgedit/>,
        url:"/imgconvert",
        name:"照片编辑器",
        content:"利用文字、效果、镜框、贴纸，让图片更加生动有趣。使用简便的编辑工具，满足你的创意需求。"
      },
      {
        id: 7,
        svg:<Watermark/>,
        url:"watermark",
        name:"给图片加水印",
        content:"快速给你的图片加上图像或文本水印。选择排版、透明度和位置。"
      },
      {
        id: 8,
        svg:<Originality/>,
        url:"originality",
        name:"搞笑创意图片生成",
        content:"通过一个简单的步骤，在线制作搞笑创意图片。选择你自己的模板，或者从最流行的模板中选择。"
      },
      {
        id: 9,
        svg:<Rotate/>,
        url:"rotate",
        name:"旋转一个图片",
        content:"同时旋转多个 JPG、PNG或GIF图片，每次选择横向或纵向图片！"
      },
      {
        id: 10,
        svg:<Htmlconvert/>,
        url:"htmlconvert",
        name:"HTML转图片",
        content:"将HTML中的网页转换为JPG或SVG。复制并粘贴网页的URL链接，然后单击，将其转换为图片。"
      },
      {
        id: 11,
      },
      {
        id: 12,
      }
    ]
  }
  return (
    <>
      <div className='mt-6.25  flex flex-col items-center  w-full h-full '>
        <div className='mt-23 flex-1  w-268 h-60 rounded 1600sc:w-408  bg-white'>

        </div>
        <div className='flex  1600sc:flex-1 flex-row flex-wrap content-around  justify-around    mt-10.5 h-127 w-272 1600sc:w-415   '>
          {
            funcModel.model.map((item,index) =>
              <div key={index} onClick={()=>{
               if(item.id<11){ router.push(item.url)}
                }} className='w-64.5 h-37.75  1600sc:w-100 1600sc:h-45 cursor-default flex flex-row  justify-around -space-x-4.5   bg-nb-2E2F30'>
                <div className='flex flex-col   justify-around  w-10.5 h-2/5  '><div>{item.svg}</div></div>
                {
                  index>9?"":<div className={`w-42 h-36 flex  flex-col justify-center 1600sc:w-70   items-start  `}>
                  <div className=' w-full h-6'><p className='font-p16-F9F9F9-re text-left '>{t(`sidebar.${index+1}`)}</p></div>
                   <div className=' mt-2 w-full h-26'><p className='font-p13-C1C1C1-sem text-left '>{t(`home.homeFunc.${index}`)}</p></div>
                 </div>
                }
                
              </div>
              
            )
          }
        </div>
      </div>
    </>
  )
}

export const getStaticProps=async ({locale})=>({
  props:{
    ...await serverSideTranslations(locale,['common']),
  }
})
export default observer(Home)