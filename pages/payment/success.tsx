import Router, { useRouter } from "next/router"
import { useEffect } from "react"
import useStore from "../../lib/stores/stores"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function PaySucceed(data:any) {
    const {paymentStore} = useStore()
    const router=useRouter()
    useEffect(()=>{
       if(data){
        paymentStore.aliapyStats(data)
       }
    })
    return (
        <>
            <div className='flex flex-row justify-center items-center w-screen h-screen  bg-bg-succeed'>
                <div className='flex flex-col items-center h-140 w-94.5 '>
                    <div className='h-20'><img src='/Logo_AwesomeImg.svg' /></div>
                    <div className='w-74 h-62'><img src='/pay_img_succeed.png' /></div>
                    <div className='flex flex-col h-20 w-full justify-center  items-center  space-y-3'>
                        <p className='font-p26-FFFFFF-sem font-sans'>Sign up succeed!</p>
                        <p className='font-p20-FFFFFF-sem font-sans'>Welcome to AwesomeIMG</p>
                    </div>
                    <div className='flex flex-row justify-center items-center w-full h-20'>
                        <button onClick={()=>router.push('/home')} className='h-10.5 w-74.5 bg-nb-2F63AE rounded-2xl font-p16-FFFFFF-re'>Start using AwesomeIMG</button>
                    </div>
                </div>
            </div>
        </>
    )

}
PaySucceed.getInitialProps = async (ctx:any) => {
    const out_trade_no=ctx.req?.query.out_trade_no
    const trade_no =ctx.req?.query.trade_no
    const total_amount=ctx.req?.query.total_amount
    console.log("1111",ctx.req?.query)
    const data={
        out_trade_no:out_trade_no,
        trade_no:trade_no,
        total_amount:total_amount
    }
    return {data}
}

export default PaySucceed