import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Contact from '../../components/Contact'
import Layout from '../../components/Layout'
import useStore from '../../lib/stores/stores'
import { Airplane, Rocket, Ufosvg, Chosen } from '../../components/Svg'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
export default function Subscribe() {
    return (
        <Layout>
            <Schememonth />

        </Layout>
    )
}
const Schememonth = () => {
    const [showLeft, setShowLeft] = useState(false)
    const [showRight, setShowRight] = useState(false)
    const { appStore, loginSignStore } = useStore()
    const list = [1, 2, 3]
    const { t } = useTranslation('subscrible')
    const router = useRouter()
    const functionMessage = [
        [
            {
                id: 1,
                svg: <Airplane />,
                version: "免费版",
                messageone: "适合个人版本",
                fees: 0,
                btnname: "您现在的方案"
            }
        ],
        [
            {
                id: 2,
                svg: <Rocket />,
                version: "高级付费用户",
                messageone: "适合专业个人/小团队使用",
                messagetwo: "按年收费，一次性付款仅 ",
                fees: 3,
                btnname: "注册高级用户"
            }
        ],
        [
            {
                id: 3,
                svg: <Ufosvg />,
                version: "企业版",
                messageone: "适合业务需要的专门定制方案",
                btnname: "联络我们"
            }
        ]
    ]
    const functionMessageChildren = [
        [
            {
                id: 1,
                svg: <Chosen />,
                message: "获取AwesomeIMG插件",
            },
            {
                id: 2,
                svg: <Chosen />,
                message: "可以使用部分图片处理工具",
            },
            {
                id: 3,
                svg: <Chosen />,
                message: "批量处理文件时，一次可以同步处理8张图片",
            },
            {
                id: 4,
                svg: <Chosen />,
                message: "可以在线使用",
            },
        ],
        [
            {
                id: 1,
                svg: <Chosen />,
                message: "去广告",
            },
            {
                id: 2,
                svg: <Chosen />,
                message: "可以使用免费版的所用功能",
            },
            {
                id: 3,
                svg: <Chosen />,
                message: "可以使用全部图片处理工具",
            },
            {
                id: 4,
                svg: <Chosen />,
                message: "批量同步处理文件时，无上限张数；专属节点，处理速率更快",
            },
        ],
        [
            {
                id: 1,
                svg: <Chosen />,
                message: "去广告",
            },
            {
                id: 2,
                svg: <Chosen />,
                message: "可以使用免费版的所用功能",
            },
            {
                id: 3,
                svg: <Chosen />,
                message: "可以使用全部图片处理工具",
            },
            {
                id: 4,
                svg: <Chosen />,
                message: "批量同步处理文件时，无上限张数；专属节点，处理速率更快",
            },
        ]]
    const handleLeft = () => {
        setShowLeft(true)
        setShowRight(false)
    }
    const handleRight = () => {
        setShowRight(true)
        setShowLeft(false)
    }
    useEffect(() => {
        if (!showLeft && !showRight) {
            setShowRight(true)
        }
    })
    return (
        <>
            <div className='flex flex-col items-center mt-23 w-full h-full  '>
                <div className='flex flex-col justify-center items-center space-y-6  w-full h-1/6 '>
                    <p className='font-p36-ffffff-sem'>{t('subscrible.title')}</p>
                    <div className='relative w-57 h-10 rounded-2xl bg-nb-2E2F30'>
                        <button className={`${showLeft ? "absolute w-30 h-9 bg-nb-4C90FE rounded-2xl font-p16-FFFFFF-re left-0.5 top-0.5 z-[10]" : "absolute w-30 h-9 bg-nb-2E2F30 rounded-l-2xl font-p16-A2A3BC-re left-0.5 top-0.5"}`} onClick={() => handleLeft()}>{t('subscrible.monthFees')}</button>
                        <button className={`${showRight ? "absolute w-30 h-9 bg-nb-4C90FE rounded-2xl font-p16-FFFFFF-re right-0.5 top-0.5 z-[10]" : "absolute w-30 h-9 bg-nb-2E2F30 rounded-r-2xl font-p16-A2A3BC-re right-0.5 top-0.5"}`} onClick={() => handleRight()}>{t('subscrible.yearFees')}</button>
                        <div className={`absolute w-14.5 h-6 rounded-br-2xl rounded-t-2xl bg-ng-FFB400 -right-10 -top-2  z-[20] text-center font-p13-191919-sem font-bold ${showRight ? "" : "hidden"}`}><p className='leading-6 '>-16.7%</p></div>
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center space-x-14 w-full h-3/5 '  >
                    {
                        list.map((items, index) => {
                            return functionMessage[index].map(data =>
                                <div key={index} className={` w-80 rounded-2xl bg-nb-sidebar-grey ${index === 1 ? "h-127" : "h-120"}`}>
                                    <div className='relative rounded-2xl h-20 w-full '><div className='absolute -top-5 left-4'>{data.svg}</div></div>
                                    {
                                        index === 0 ? <div className='flex flex-row h-25 w-full '>
                                            <div className='flex flex-col justify-center space-y-2  items-start ml-4 w-3/4 h-full'><p className='font-p26-FFFFFF-sem font-bold'>{t(`subscrible.version.${index}`)}</p><p className='font-p13-CFD0E4-sem'>{t(`subscrible.versionDetail.${index}`)}</p></div>
                                            <div className='flex flex-row justify-end items-end mt-1 mr-3  w-1/4 h-full'><p className=' font-p40-FFFFFF-sem font-bold mb-3'>$</p><p className='font-p60-FFFFFF-sem font-bold'  >{data.fees}</p></div>
                                        </div> : index === 1 ? <div className='flex flex-row h-30 w-full '>
                                            <div className='flex flex-col justify-center space-y-2  items-start ml-4  w-3/4  h-full'><p className='font-p26-FFFFFF-sem font-bold  w-70 text-left'>{t(`subscrible.version.${index}`)}</p><p className='font-p13-CFD0E4-sem w-64  text-left'>{t(`subscrible.versionDetail.${index}`)}</p><p className='font-p13-CFD0E4-sem text-left'>{t(`subscrible.versionDetail.3`)}<span className='font-p14-4C90FE-sems font-bold '>$30</span></p></div>
                                            <div className='flex flex-row justify-end items-end mr-3  mt-1 w-1/4   h-full'><p className='font-p40-FFFFFF-sem font-bold mb-3'>$</p><p className='font-p60-FFFFFF-sem font-bold' >3</p></div>
                                        </div> : index === 2 ? <div className='flex flex-row h-25 w-full '>
                                            <div className='flex flex-col justify-center space-y-2  items-start ml-4 w-3/4  h-full'><p className='font-p26-FFFFFF-sem font-bold'>{t(`subscrible.version.${index}`)}</p><p className='font-p13-CFD0E4-sem font-p13-CFD0E4-sem text-left'>{t(`subscrible.versionDetail.${index}`)}</p></div>
                                        </div> : ""
                                    }
                                    <div className='flex flex-col justify-center  h-60 w-full    '>
                                        {
                                            functionMessageChildren[index].map((item, value) =>
                                                <div className='ml-4 flex flex-row justify-start space-x-4 h-15 mt-2  w-70  text-left' key={item.id}>
                                                    <div className=''>{item.svg}</div>
                                                    <p className={`flex flex-row  font-normal font-p14-CFD0E4-sem w-full  text-left  `}>{t(`subscrible.funcDetailOne.${index}.${value}`)}</p>
                                                </div>


                                            )
                                        }
                                    </div>
                                    <div className='h-20 w-full flex flex-row justify-center  '>
                                        <button className={`w-50 h-10.5 ${data.id === 2 ? "bg-ng-FFB400" : "bg-nb-2F63AE "} rounded-2xl`} key={data.id} onClick={() => {
                                            if (data.id === 3) {
                                                appStore.setShowContactModel(true)
                                            } else if (data.id === 2) {
                                                router.push('/payment')
                                            }
                                        }}>{t(`subscrible.btnMessage.${index}`)}</button>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </>
    )
}
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'subscrible']),
    },
})

