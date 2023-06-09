import Router, { useRouter } from "next/router"
import { useEffect } from "react"
import stores from "../../lib/stores/stores"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"
import {JWT} from "../../lib/util/JWT"

function PaySucceed(data:any) {
    const {t}=useTranslation('subscrible')

    const router=useRouter()
    return (
        <>
            <div className='flex flex-row justify-center items-center w-screen h-screen  bg-bg-succeed'>
                <div className='flex flex-col items-center h-140 w-94.5 '>
                    <div className='h-20'><img src='/Logo_AwesomeImg.svg' /></div>
                    <div className='w-74 h-62 ml-24'><img src='/pay_img_succeed.png' /></div>
                    <div className='flex flex-col h-20 w-full justify-center  items-center  space-y-3'>
                   { router.locale === 'en' ? <p className='font-p26-FFFFFF-row'>Sign up succeed!</p>:<p className='font-p26-FFFFFF-w400 font-sans'>订阅成功</p>}
                    {router.locale === 'en' ? <p className='font-p20-FFFFFF-row'>Welcome to AwesomeIMG</p>:<p className='font-p26-FFFFFF-w400 font-sans'>欢迎来到 AwesomeIMG</p>}
                    </div>
                    <div className='flex flex-row justify-center items-center w-full h-20'>
                    {router.locale === 'en' ?  <button onClick={()=>router.push('/home')} className='h-10.5 w-74.5 bg-nb-2F63AE rounded-2xl font-p16-FFFFFF-w700'>Start using AwesomeIMG</button>:
                    <button onClick={()=>router.push('/home')} className='h-10.5 w-74.5 bg-nb-2F63AE rounded-2xl font-p16-FFFFFF-w700'>开始使用 AwesomeIMG</button>}
                    </div>
                </div>
            </div>
        </>
    )

}
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common','subscrible']),
    },
})

export default PaySucceed